import { Link } from "react-router-dom"; 

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">
            <span className="text-white">Driver</span>Buddy
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/customer/login"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              Customer
            </Link>
          </li>
          <li>
            <Link
              to="/driver/login"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              Driver
            </Link>
          </li>
          <li>
            <Link
              to="#about"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="#functions"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              Functions
            </Link>
          </li>
          <li>
            <Link
              to="#testimonials"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              to="#contact"
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
