// Profile.js
import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("123 Main St, Anytown, USA");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Implement save functionality here (e.g., API call to update user profile)
    console.log("Profile updated:", { name, email, phone, address });
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col items-center justify-center w-full p-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Profile
          </h2>
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Name:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                  placeholder="Enter your name"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-300">{name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Email:
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                  placeholder="Enter your email"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-300">{email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Phone:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-300">{phone}</p>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Address:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                  placeholder="Enter your address"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-300">{address}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleEditToggle}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 focus:outline-none"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
