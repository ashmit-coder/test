import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Lock, Bell, Moon, Sun, BellOff } from "lucide-react";

const Settings = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Implement password change functionality here
    console.log("Password updated:", { newPassword });
    alert("Password successfully updated!");
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Implement theme toggle functionality
  };

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
    // Implement notification preference update
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col w-full p-6 bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 ">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Settings
          </h2>

          {/* Password Change Section */}
          <section className="mb-8">
            <h3 className="flex items-center text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              <Lock className="mr-2" />
              Change Password
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Current Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  New Password:
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Confirm New Password:
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSavePassword}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Save Password
                </button>
              </div>
            </div>
          </section>

          {/* Dark Mode Section */}
          <section className="mb-8">
            <h3 className="flex items-center text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              <Moon className="mr-2" />
              Dark Mode
            </h3>
            <div className="flex items-center">
              <label className="text-gray-700 dark:text-gray-300 font-medium mr-4">
                Enable Dark Mode:
              </label>
              <button
                onClick={handleDarkModeToggle}
                className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  darkMode ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transition-transform duration-300 transform ${
                    darkMode ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
                <Sun
                  className={`absolute left-2 text-xs transition-opacity duration-300 ${
                    darkMode ? "opacity-0" : "opacity-100"
                  }`}
                  size={16}
                  color={darkMode ? "gray" : "orange"}
                />
                <Moon
                  className={`absolute right-1.5 text-xs transition-opacity duration-300 ${
                    darkMode ? "opacity-100" : "opacity-0"
                  }`}
                  size={16}
                  color={darkMode ? "yellow" : "gray"}
                />
              </button>
            </div>
          </section>

          {/* Notification Preferences Section */}
          <section className="mb-8">
            <h3 className="flex items-center text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              <Bell className="mr-2" />
              Notification Preferences
            </h3>
            <div className="flex items-center">
              <label className="text-gray-700 dark:text-gray-300 font-medium mr-4">
                Email Notifications:
              </label>
              <button
                onClick={handleNotificationToggle}
                className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  notifications ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transition-transform duration-300 transform ${
                    notifications ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
                <Bell
                  className={`absolute left-2 transition-opacity duration-300 ${
                    notifications ? "opacity-0" : "opacity-100"
                  }`}
                  size={16}
                  color={notifications ? "gray" : "white"}
                />
                <BellOff
                  className={`absolute right-1.5 transition-opacity duration-300 ${
                    notifications ? "opacity-100" : "opacity-0"
                  }`}
                  size={16}
                  color={notifications ? "white" : "gray"}
                />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
