import { useState } from "react";

import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Sign In
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 dark:focus:ring-indigo-600"
          >
            Sign In
          </button>
        </form>

        {/* Google Auth Button */}
        <div className="mt-6">
          <button className="w-full  bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-lg shadow-sm flex gap-4 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 dark:focus:ring-gray-600">
            <FcGoogle size={24}/>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
