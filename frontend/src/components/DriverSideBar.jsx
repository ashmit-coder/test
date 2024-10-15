import { Home, User, LifeBuoy, Settings, ClipboardList } from "lucide-react";

const DriverSidebar = () => {
  return (
    <aside className="bg-white dark:bg-gray-800 shadow-md w-64 p-6">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-8">
        DriverBuddy
      </h2>
      <nav>
        <ul className="space-y-4">
          {/* Dashboard */}
          <li>
            <a
              href="/driver"
              className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              <Home className="mr-2" />
              Dashboard
            </a>
          </li>
          
          {/* Available Ride Requests */}
          <li>
            <a
              href="/driver/rides"
              className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              <ClipboardList className="mr-2" />
                Open Rides
            </a>
          </li>

          {/* Profile */}
          <li>
            <a
              href="#"
              className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              <User className="mr-2" />
              Profile
            </a>
          </li>

          {/* Settings */}
          <li>
            <a
              href="#"
              className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              <Settings className="mr-2" />
              Settings
            </a>
          </li>

          {/* Support */}
          <li>
            <a
              href="#"
              className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              <LifeBuoy className="mr-2" />
              Support
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DriverSidebar;
