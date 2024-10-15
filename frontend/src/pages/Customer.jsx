import Sidebar from "../components/Sidebar";
import { useState } from "react";
import CustomerSupport from "./CustomerSupport";

const CustomerDashboard = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const orders = [
      { id: "12345", status: "Shipped", date: "2024-10-15" },
      { id: "12345", status: "Shipped", date: "2024-10-15" },
      { id: "12345", status: "Shipped", date: "2024-10-15" },
      { id: "12346", status: "Pending", date: "2024-10-14" },
    ];

    const handleOrderClick = (orderId) => {
      setSelectedOrder(orderId);
      // Open your map here based on the orderId
      console.log(`Open map for Order #${orderId}`);
    };
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome Back, Customer!
        </h1>

        {/* My Orders Section */}
        <section
          id="orders"
          className="mb-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-md transition duration-200"
        >
          <h2 className="text-2xl font-bold mb-4">My Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-blue-100 dark:hover:bg-gray-600/20 cursor-pointer"
                    onClick={() => handleOrderClick(order.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Order #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {order.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Support Section */}
        <CustomerSupport />

        
      </main>
    </div>
  );
};

export default CustomerDashboard;
