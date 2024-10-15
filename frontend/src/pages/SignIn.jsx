import { useState } from "react";
import axios from "axios"
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    const payload = {
      "email":email,
      "password":password,
    };

    try {
      console.log(payload,`${import.meta.env.VITE_BACKEND_URL}/user/login`)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, payload);
      console.log(response)
      if (response.status === 200) {
        const { token } = response.data; 
        
        localStorage.setItem("token", token);

        navigate("/customer");
      }
    } catch (err) {
      console.log(err)
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="">
    <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
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
          {error && (
            <div className="mb-4 text-red-500">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 dark:focus:ring-indigo-600"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6">
          <button disabled className="w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-lg shadow-sm flex gap-4 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 dark:focus:ring-gray-600">
            <FcGoogle size={24} />
            Sign in with Google
          </button>
        </div>
        <div className="text-center mt-4">
          Do you have a Account? <span className="text-blue-700"><a href="/customer/register">Register Now</a></span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignIn;
