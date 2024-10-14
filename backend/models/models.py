from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship, Session
from db.main import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    ride_requests = relationship("RideRequest", back_populates="user")

class DriverCredentials(Base):
    __tablename__ = "driver_credentials"
    
    driver_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    email = Column(String, unique=True, index=True)


    driver_info = relationship("DriverInfo", back_populates="credentials", uselist=False)


class DriverInfo(Base):
    __tablename__ = "driver_info"
    
    id = Column(Integer, primary_key=True, index=True)
    driver_id = Column(Integer, ForeignKey("driver_credentials.driver_id"), unique=True)
    name = Column(String)
    phone_number = Column(String)
    address = Column(String)
    vehicle_capacity = Column(String)
    vehicle_number = Column(String)
    vehicle_brand = Column(String)
    license_number = Column(String)

    credentials = relationship("DriverCredentials", back_populates="driver_info")

class RideRequest(Base):
    __tablename__ = "ride_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)  # Added user_id as a foreign key
    driver_id = Column(Integer, ForeignKey("driver_credentials.driver_id"))
    passenger_name = Column(String)
    pickup_location = Column(String)
    dropoff_location = Column(String)
    status = Column(String)

    # Relationship with User and DriverCredentials
    user = relationship("User", back_populates="ride_requests")
    driver = relationship("DriverCredentials")

class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class FleetInfo(Base):
    __tablename__ = "fleet_info"
    
    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, ForeignKey("admins.id", ondelete="CASCADE"))
    driver_id = Column(Integer, ForeignKey("driver_credentials.driver_id", ondelete="CASCADE"))
