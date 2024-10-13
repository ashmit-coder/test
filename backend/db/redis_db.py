import json
import redis 
import os
from dotenv import load_dotenv

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL")

# print(REDIS_URL)
redis_client = redis.Redis.from_url(REDIS_URL,decode_responses=True)

def cache_ride_request(ride_data: dict, expiration: int = 3600):
    ride_request_id = ride_data['id']  # Use request ID to set the key
    redis_client.set(f"ride_request:{ride_request_id}", json.dumps(ride_data), ex=expiration)

def get_all_ride_requests():
    keys = redis_client.keys("ride_request:*")
    requests = []
    for key in keys:
        request_data = redis_client.get(key)
        if request_data:
            requests.append(json.loads(request_data))
    return requests

def assign_driver_to_ride(ride_request_id: int, driver_id: int):
    ride_data = redis_client.get(f"ride_request:{ride_request_id}")
    if ride_data:
        ride = json.loads(ride_data)
        ride['driver_id'] = driver_id  
        cache_ride_request(ride)  
        return ride
    return None
