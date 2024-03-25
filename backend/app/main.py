import time

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from models import SessionLocal, Customer, Address, City, Country

app = FastAPI()

def get_db(retry_limit=50, delay_seconds=5):
    attempt_count = 0
    while attempt_count < retry_limit:
        try:
            db = SessionLocal()
            db.execute("SELECT 1")
            yield db
            break
        except Exception as e:
            attempt_count += 1
            print(f"Database connection attempt {attempt_count} failed. Retrying in {delay_seconds} seconds...")
            time.sleep(delay_seconds)
            if attempt_count == retry_limit:
                raise HTTPException(status_code=500, detail="Could not connect to the database.")
        finally:
            if 'db' in locals():
                db.close()

# endpoint to get all canadian customers names and email, ordered by city name
@app.get("/canadian_customers")
def read_canadian_customers(db: Session = Depends(get_db)):
    try:
        canadian_customers = (
            db.query(Customer)
            .join(Address)
            .join(City)
            .join(Country)
            .filter(Country.country == "Canada")
            .order_by(City.city)
            .all()
        )

        response = {
            "canadian_customers": [
                {
                    "customer_id": customer.customer_id,
                    "first_name": customer.first_name,
                    "last_name": customer.last_name,
                    "email": customer.email,
                    "city": customer.address.city.city
                } for customer in canadian_customers
            ]
        }
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
