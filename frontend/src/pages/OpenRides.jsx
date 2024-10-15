import { useEffect, useState } from "react";
import axios from "axios";

const OpenRides = () => {
  const [rideRequests, setRideRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRideRequests = async () => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem("token");

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/driver/ride_requests`, {
          headers: {
            accept: 'application/json', // Ensure the Accept header is set
            token: token, // Add the token to the headers
          },
        });

        setRideRequests(response.data.ride_requests);
      } catch (err) {
        console.log(err)
        setError("Failed to fetch ride requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRideRequests();
  }, []);

  return (
    <div className="flex-grow p-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Open Rides
      </h1>

      {loading && <p>Loading rides...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {rideRequests.length === 0 ? (
          <p>No available rides at the moment.</p>
        ) : (
          <ul className="space-y-4">
            {rideRequests.map((ride) => (
              <li key={ride.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Ride from {ride.pickup_location} to {ride.dropoff_location}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Capacity: {ride.capacity} - Status: {ride.status}
                </p>
                <button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                  Accept Ride
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OpenRides;
