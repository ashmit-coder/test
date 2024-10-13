from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship, Session
from db.main import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

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

    credentials = relationship("DriverCredentials", back_populates="driver_info")
