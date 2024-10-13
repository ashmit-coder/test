from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str


# Pydantic schema for driver signup
class DriverSignup(BaseModel):
    username: str
    password: str
    name: str
    phone_number: str
    address: str

# Pydantic schema for driver login
class DriverLogin(BaseModel):
    username: str
    password: str

# Pydantic schema for returning driver information
class DriverInfoOut(BaseModel):
    driver_id: int
    username: str
    name: str
    phone_number: str
    address: str

    class Config:
        orm_mode = True
