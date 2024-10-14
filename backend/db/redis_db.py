import json
import redis 
import os
from dotenv import load_dotenv

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL")

# print(REDIS_URL)
redis_pool = redis.ConnectionPool.from_url(REDIS_URL)
redis_client = redis.Redis(connection_pool=redis_pool,decode_responses=True)

def cache_ride_request(ride_data: dict, expiration: int = 3600):
    ride_request_id = ride_data['id']  
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
        ride['status'] = "assigned"

        redis_client.set(f"ride_assigned:{ride_request_id}", json.dumps(ride))

        redis_client.delete(f"ride_request:{ride_request_id}")

        return ride
    return None

def cancel_assigned_ride(ride_request_id: int):

    ride_data = redis_client.get(f"ride_assigned:{ride_request_id}")
    
    if ride_data:
        ride = json.loads(ride_data)

        ride['driver_id'] = None
        ride['status'] = "pending"

        redis_client.set(f"ride_request:{ride_request_id}", json.dumps(ride))

        redis_client.delete(f"ride_assigned:{ride_request_id}")
        
        return ride
    return None
