from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str


class DriverSignup(BaseModel):
    username: str
    email: str
    password: str
    name: str
    phone_number: str
    address: str
    vehicle_capacity :str
    vehicle_number :str
    vehicle_brand :str

class DriverLogin(BaseModel):
    email: str
    password: str

class DriverInfoOut(BaseModel):
    driver_id: int
    username: str
    email: str
    name: str
    phone_number: str
    address: str
    vehicle_capacity :str
    vehicle_number :str
    vehicle_brand :str

    class Config:
        form_atributes = True

class RideRequestSchema(BaseModel):
    passenger_name: str
    pickup_location: str
    dropoff_location: str
    status: str
    capacity:str
