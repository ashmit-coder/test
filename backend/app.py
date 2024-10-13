from fastapi import FastAPI, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from models import models
from db.main import get_db , engine
from models import app_models
from auth import services
from typing import Annotated

app = FastAPI()

# Create tables on startup
models.Base.metadata.create_all(bind=engine)

# Route to create a new user
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

    # Verify the password
    if not services.verify_password(user.password ,db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )

    # Generate a JWT token
    access_token = services.create_access_token(data={"sub": db_user.username})

    # Return the token
    return {"access_token": access_token, "token_type": "bearer"}

# Route to get a user by ID
# @app.get("/users/{user_id}")
# def get_user(user_id: int, db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.id == user_id).first()
#     if user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user


@app.get("/protected")
async def protected_route(token: Annotated[str | None, Header()] = None):
    # Validate the token
    payload = services.validate_jwt(token)
    
    # You can access the user's data from the payload if needed
    username = payload.get("sub")
    
    return {"message": "Welcome to the protected route!", "user": username}

# Driver signup route
@app.post("/driver/signup", response_model=app_models.DriverInfoOut)
async def driver_signup(driver: app_models.DriverSignup, db: Session = Depends(get_db)):
    # Check if username or email already exists
    existing_driver = db.query(models.DriverCredentials).filter(
        (models.DriverCredentials.username == driver.username) |
        (models.DriverCredentials.email == driver.email)
    ).first()
    if existing_driver:
        raise HTTPException(status_code=400, detail="Username or email already registered")

    # Hash the password
    hashed_password = services.get_password_hash(driver.password)

    # Create new driver credentials
    new_driver_creds = models.DriverCredentials(
        username=driver.username,
        email=driver.email,
        hashed_password=hashed_password
    )
    db.add(new_driver_creds)
    db.commit()
    db.refresh(new_driver_creds)

    # Create new driver info linked to the credentials
    new_driver_info = app_models.DriverInfo(
        driver_id=new_driver_creds.driver_id,
        name=driver.name,
        phone_number=driver.phone_number,
        address=driver.address
    )
    db.add(new_driver_info)
    db.commit()
    db.refresh(new_driver_info)

    # Return the combined driver information
    return app_models.DriverInfoOut(
        driver_id=new_driver_creds.driver_id,
        username=new_driver_creds.username,
        email=new_driver_creds.email,
        name=new_driver_info.name,
        phone_number=new_driver_info.phone_number,
        address=new_driver_info.address
    )

# Driver login route
@app.post("/driver/login")
async def driver_login(login_data: app_models.DriverLogin, db: Session = Depends(get_db)):
    # Check if the email exists
    db_driver = db.query(models.DriverCredentials).filter(models.DriverCredentials.email == login_data.email).first()
    if not db_driver:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    # Verify the password
    if not services.verify_password(login_data.password, db_driver.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    # Return a success message or token (you can implement JWT here if needed)
    return {"message": f"Welcome, {db_driver.username}!"}