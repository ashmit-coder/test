import Sidebar from "../components/DriverSideBar";
import { useState } from "react";

const DriverDashboard = () => {
  const [selectedRide, setSelectedRide] = useState(null);

  // Mock data for assigned rides
  const rides = [
    { id: "54321", status: "In Progress", date: "2024-10-12", pickup: "Location A", dropoff: "Location B" },
    { id: "54322", status: "Pending", date: "2024-10-13", pickup: "Location C", dropoff: "Location D" },
    { id: "54323", status: "Completed", date: "2024-10-11", pickup: "Location E", dropoff: "Location F" },
  ];

  const handleRideClick = (rideId) => {
    setSelectedRide(rideId);
    // Open your map or other relevant information here based on the rideId
    console.log(`Open map or details for Ride #${rideId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome Back!
        </h1>

        <section
          id="rides"
          className="mb-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-md transition duration-200"
        >
          <h2 className="text-2xl font-bold mb-4">Previous Rides</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ride ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Pickup Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Dropoff Location
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                {rides.map((ride) => (
                  <tr
                    key={ride.id}
                    className="hover:bg-blue-100 dark:hover:bg-gray-600/20 cursor-pointer"
                    onClick={() => handleRideClick(ride.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Ride #{ride.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {ride.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {ride.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {ride.pickup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {ride.dropoff}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
};

export default DriverDashboard;
