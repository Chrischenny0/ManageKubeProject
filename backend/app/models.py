from sqlalchemy import Column, Integer, String, ForeignKey, create_engine, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.dialects.mysql import ENUM

DATABASE_URL = "mysql+pymysql://root:password@localhost/sakila"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Country(Base):
    __tablename__ = 'country'

    country_id = Column(Integer, primary_key=True)
    country = Column(String(50))

    cities = relationship("City", back_populates="country")

class City(Base):
    __tablename__ = 'city'

    city_id = Column(Integer, primary_key=True)
    city = Column(String(50))
    country_id = Column(Integer, ForeignKey('country.country_id'))

    country = relationship("Country", back_populates="cities")
    addresses = relationship("Address", back_populates="city")

class Address(Base):
    __tablename__ = 'address'

    address_id = Column(Integer, primary_key=True)
    address = Column(String(50))
    district = Column(String(20))
    city_id = Column(Integer, ForeignKey('city.city_id'))
    postal_code = Column(String(10), nullable=True)
    phone = Column(String(20))

    city = relationship("City", back_populates="addresses")
    customers = relationship("Customer", back_populates="address")

class Customer(Base):
    __tablename__ = 'customer'

    customer_id = Column(Integer, primary_key=True)
    store_id = Column(Integer)
    first_name = Column(String(45))
    last_name = Column(String(45))
    email = Column(String(50))
    address_id = Column(Integer, ForeignKey('address.address_id'))
    active = Column(Boolean, default=True, server_default='1')
    create_date = Column(String(50))

    address = relationship("Address", back_populates="customers")

Base.metadata.create_all(bind=engine)
