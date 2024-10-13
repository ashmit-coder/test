from fastapi import FastAPI, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from models import models
from db.main import get_db , engine
from models import app_models
from auth import services
from typing import Annotated
from db import redis_db

app = FastAPI()

# Create tables on startup
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

    access_token = services.create_access_token(data={"sub": db_user.user_id})

    return {"access_token": access_token, "token_type": "bearer"}

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
        vehicle_number = driver.vehicle_number
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

    access_token = services.create_access_token(data={"sub": db_driver.driver_id})

    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/user/ride_request")
async def create_ride_request(ride_request: app_models.RideRequestSchema,token: Annotated[str | None, Header()]):

    user = services.validate_jwt(token)

    new_ride = {
        "id": str(user.get("sub")) + "_" + ride_request.pickup_location + "_" + ride_request.dropoff_location,  
        "user_id": user.get("sub"),
        "passenger_name": ride_request.passenger_name,
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
async def accept_ride_request(ride_request_id: int, token: Annotated[str | None, Header()]):

    current_driver = services.validate_jwt(token)
    # Assign the driver to the ride request
    updated_ride = redis_db.assign_driver_to_ride(ride_request_id, current_driver.get("sub"))
    if not updated_ride:
        raise HTTPException(status_code=404, detail="Ride request not found or already accepted")

    return {"message": "Ride request accepted", "ride_request": updated_ride}
        