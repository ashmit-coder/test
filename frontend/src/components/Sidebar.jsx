import { Home, User, LifeBuoy, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="bg-white dark:bg-gray-800 shadow-md w-64 p-6">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-8">
        DriverBuddy
      </h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <a
              href="/customer"
              className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              <Home className="mr-2" />
              My Orders
            </a>
          </li>
          <li>
            <a
              href="/customer/profile"
              className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              <User className="mr-2" />
              Profile
            </a>
          </li>
          <li>
            <a
              href="/customer/setting"
              className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              <Settings className="mr-2" />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
