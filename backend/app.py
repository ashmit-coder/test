from fastapi import FastAPI, Depends, HTTPException, status, Header,  WebSocket, WebSocketDisconnect
import uvicorn
from sqlalchemy.orm import Session
from models import models
from db.main import get_db , engine
from models import app_models
from auth import services
from fastapi import FastAPI, Depends, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Dict
from models import models
from db.main import get_db, engine
from models import app_models
from auth import services
from typing import Annotated
from db import redis_db
from datetime import datetime


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Set the list of allowed origins
    allow_credentials=True,  # Allow cookies and authentication headers
    allow_methods=["*"],     # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],     # Allow all headers (Authorization, Content-Type, etc.)
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
# Create tables on startup
# models.Base.metadata.drop_all(bind=engine)

models.Base.metadata.create_all(bind=engine)

@app.post("/users/signup")
def create_user(user: app_models.UserCreate, db: Session = Depends(get_db)):

    hashed_password = services.get_password_hash(user.password)

    db_user = models.User(username=user.username, email=user.email, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"success":True,"id":db_user.user_id}

@app.post("/users/login")
def login(user: app_models.UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )

    if not services.verify_password(user.password ,db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )

    access_token = services.create_access_token(data={"sub": db_user.user_id,"role":"user"})

    return {"token": access_token, "token_type": "bearer"}

# Route to get a user by ID
# @app.get("/users/{user_id}")
# def get_user(user_id: int, db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.user_id == user_id).first()
#     if user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user


@app.get("/protected")
async def protected_route(token: Annotated[str | None, Header()]):
    # Validate the token
    payload = services.validate_jwt(token)
    
    
    username = payload.get("sub")
    
    return {"message": "Welcome to the protected route!", "user": username}

@app.post("/driver/signup", response_model=app_models.DriverInfoOut)
async def driver_signup(driver: app_models.DriverSignup, db: Session = Depends(get_db)):

    existing_driver = db.query(models.DriverCredentials).filter(
        (models.DriverCredentials.username == driver.username) |
        (models.DriverCredentials.email == driver.email)
    ).first()
    if existing_driver:
        raise HTTPException(status_code=400, detail="Username or email already registered")

    
    hashed_password = services.get_password_hash(driver.password)

    
    new_driver_creds = models.DriverCredentials(
        username=driver.username,
        email=driver.email,
        password=hashed_password
    )
    db.add(new_driver_creds)
    db.commit()
    db.refresh(new_driver_creds)

    
    new_driver_info = models.DriverInfo(
        driver_id=new_driver_creds.driver_id,
        name=driver.name,
        phone_number=driver.phone_number,
        address=driver.address,
        vehicle_brand = driver.vehicle_brand,
        vehicle_capacity = driver.vehicle_capacity,
        vehicle_number = driver.vehicle_number,
        license_number  = driver.license_number
    )
    db.add(new_driver_info)
    db.commit()
    db.refresh(new_driver_info)

    
    return app_models.DriverInfoOut(
        driver_id=new_driver_creds.driver_id,
        username=new_driver_creds.username,
        email=new_driver_creds.email,
        name=new_driver_info.name,
        phone_number=new_driver_info.phone_number,
        address=new_driver_info.address,
        vehicle_brand = new_driver_info.vehicle_brand,
        vehicle_capacity = new_driver_info.vehicle_capacity,
        vehicle_number = new_driver_info.vehicle_number
    )


@app.post("/driver/login")
async def driver_login(login_data: app_models.DriverLogin, db: Session = Depends(get_db)):

    db_driver = db.query(models.DriverCredentials).filter(models.DriverCredentials.email == login_data.email).first()
    if not db_driver:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    if not services.verify_password(login_data.password, db_driver.password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = services.create_access_token(data={"sub": db_driver.driver_id,"role":"driver"})

    return {"token": access_token, "token_type": "bearer"}

@app.post("/user/ride_request")
async def create_ride_request(ride_request: app_models.RideRequestSchema,token: Annotated[str | None, Header()]):

    user = services.validate_jwt(token)

    new_ride = {
        "id": str(user.get("sub")) + "_" + ride_request.pickup_location + "_" + ride_request.dropoff_location,  # this is so that one user can have one ride request at a time
        "user_id": user.get("sub"),
        "pickup_location": ride_request.pickup_location,
        "dropoff_location": ride_request.dropoff_location,
        "capacity": ride_request.capacity,
        "status": "pending", 
        "driver_id": None
    }

    redis_db.cache_ride_request(new_ride, expiration = 3600)  # Cache for 1 hr
    return {"message": "Ride request submitted", "ride_request": new_ride}

@app.get("/driver/ride_requests")
async def get_ride_requests(token: Annotated[str | None, Header()]):
    services.validate_jwt(token)
    ride_requests = redis_db.get_all_ride_requests()
    return {"ride_requests": ride_requests}

@app.post("/driver/ride_request/{ride_request_id}/accept")
async def accept_ride_request(ride_request_id: str, token: Annotated[str | None, Header()]):
    driver_id = services.validate_jwt(token)

    ride = redis_db.assign_driver_to_ride(ride_request_id, driver_id.get('sub'))
    if not ride:
        raise HTTPException(status_code=404, detail="Ride request not found")
    
    user_id = (ride["user_id"])  

    if user_id in active_connections:
        user_socket = active_connections[user_id]
        await user_socket.send_text(f"Your OTP is {ride['otp']}")

    return {"message": "Ride assigned to driver", "ride": ride["id"]}
        

@app.post("/driver/cancel_ride/{ride_request_id}")
async def cancel_ride(ride_request_id: str, token: Annotated[str | None, Header()]):
    driver = services.validate_jwt(token)

    canceled_ride = redis_db.cancel_assigned_ride(ride_request_id)
    
    if not canceled_ride:
        raise HTTPException(status_code=404, detail="Assigned ride not found")
    
    return {"message": "Ride has been canceled and moved back to pending requests", "ride": canceled_ride}


@app.post("/admin/signup")
def admin_signup(admin: app_models.AdminCreate, db: Session = Depends(get_db)):

    db_admin = db.query(models.Admin).filter(models.Admin.username == admin.username).first()
    if db_admin:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = services.get_password_hash(admin.password)
    new_admin = models.Admin(username=admin.username, hashed_password=hashed_password)

    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)

    return {"message": "Admin registered successfully"}


@app.post("/admin/login")
def admin_login(admin: app_models.AdminLogin, db: Session = Depends(get_db)):

    db_admin = db.query(models.Admin).filter(models.Admin.username == admin.username).first()

    if not db_admin or not services.verify_password(admin.password, db_admin.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    access_token = services.create_access_token(data={"sub": db_admin.id,"role":"admin"})

    return {"token": access_token, "token_type": "bearer"}


@app.post("/admin/fleet/add/{driver_id}")
def add_driver_to_fleet(
    driver_id: int,
    token: Annotated[str | None, Header()],
    db: Session = Depends(get_db),
    
):

    admin = services.validate_jwt(token)
    db_admin = db.query(models.Admin).filter(models.Admin.id == admin.get("sub")).first()
    if not db_admin:
        raise HTTPException(status_code=404, detail="Admin not found")

    db_driver = db.query(models.DriverCredentials).filter(models.DriverCredentials.driver_id == driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=404, detail="Driver not found")

    existing_entry = db.query(models.FleetInfo).filter(models.FleetInfo.admin_id == db_admin.id, models.FleetInfo.driver_id == driver_id).first()
    if existing_entry:
        raise HTTPException(status_code=400, detail="Driver is already in your fleet")

    fleet_entry = models.FleetInfo(admin_id=db_admin.id, driver_id=driver_id)
    db.add(fleet_entry)
    db.commit()
    db.refresh(fleet_entry)

    return {"message": "Driver added to fleet successfully"}

active_connections: Dict[str, WebSocket] = {}  
driver_locations: Dict[str, dict] = {}  

@app.websocket("/ws/socket/user")
async def user_websocket(websocket: WebSocket, token: str):
    
    payload = services.validate_jwt(token)
    user_id = payload.get("sub")  
    await websocket.accept()
    active_connections[user_id] = websocket

    print(active_connections)
    try:
        while True:
            await websocket.receive_json() 
            print(f"User: {user_id}")
    except WebSocketDisconnect:

        print(f"User {user_id} disconnected")


@app.websocket("/ws/socket/driver")
async def driver_websocket(websocket: WebSocket, token: str):
    payload = services.validate_jwt(token)
    driver_id = payload.get("sub")  # Get driver ID from token
    await websocket.accept()
    active_connections[driver_id] = websocket  # Store driver's WebSocket connection

    try:
        while True:
            # Assume driver sends location as JSON: {"lat": <latitude>, "lng": <longitude>, "user_id": <user_id>}
            data = await websocket.receive_json()
            user_id = data.get("user_id")  # Get the user_id to whom this location belongs
            lat = data.get("lat")
            lng = data.get("lng")
            print(f"Driver {driver_id}, lat: {lat}, lng: {lng}")
            print(active_connections)
            # if user_id in active_connections:
                # If the user is connected, send the driver's location to the user
            await active_connections[int(user_id)].send_json({
                "driver_lat": lat,
                "driver_lng": lng
            })
    except WebSocketDisconnect:
        print(f"Driver {driver_id} disconnected")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", lifespan="on", reload=True)