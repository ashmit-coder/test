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

    class Config:
        form_atributes = True
