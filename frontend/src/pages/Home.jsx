import Navbar from "../components/Navbar";
import { Code, CheckCircle, Settings } from "lucide-react";

const Home = () => {
  return (
    <div className="">
      <Navbar className="sticky" />
      {/* Hero Section */}
      <section
        className="bg-blue-800 text-white h-screen flex items-center justify-center relative overflow-hidden"
        id="home"
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/Hero.jpg"
            alt="Driving"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center relative z-10">
          <h1 className="text-6xl font-bold mb-4">Welcome to DriverBuddy</h1>
          <p className="mt-4 text-xl max-w-md mx-auto">
            Your ultimate partner in driving safety and efficiency. Connect with
            drivers and enhance your journeys.
          </p>
          <button className="mt-6 bg-white text-blue-600 py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-200">
            Get Started
          </button>
        </div>
      </section>
      {/* About Us Section */}
      <section className="py-20 bg-gray-100" id="about">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          {/* Title */}
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
            About Us
          </h2>

          {/* Introductory Text */}
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            We are dedicated to providing exceptional services that help you
            succeed in your ventures. Our team focuses on quality, innovation,
            and customer satisfaction.
          </p>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Image 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400"
                alt="Our Team"
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Our Team
                </h3>
                <p className="text-gray-600">
                  Our team of experts works hard to deliver the best solutions
                  for your needs, focusing on creativity and efficiency.
                </p>
              </div>
            </div>

            {/* Image 2 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400"
                alt="Our Mission"
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Our Mission
                </h3>
                <p className="text-gray-600">
                  Our mission is to provide innovative solutions that drive
                  business growth, with a focus on customer satisfaction.
                </p>
              </div>
            </div>

            {/* Image 3 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400"
                alt="Our Values"
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Our Values
                </h3>
                <p className="text-gray-600">
                  We believe in integrity, innovation, and collaboration,
                  striving to create a lasting impact in everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Functions We Do Section */}
      <section className="py-20 bg-white" id="functions">
        <div className="container mx-auto text-center">
          {/* Section Heading */}
          <h2 className="text-4xl font-extrabold mb-8 text-gray-800">
            Functions We Do
          </h2>

          {/* Functions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-4">
            {/* Function 1 */}
            <div className="border rounded-lg p-6 shadow-lg bg-white">
              <div className="mb-4">
                <Code className="w-10 h-10 text-blue-500 mx-auto" />{" "}
                {/* Icon */}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Custom Development
              </h3>
              <p className="text-gray-600">
                We provide custom software development services to meet your
                unique business needs.
              </p>
            </div>

            {/* Function 2 */}
            <div className="border rounded-lg p-6 shadow-lg bg-white">
              <div className="mb-4">
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />{" "}
                {/* Icon */}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Project Management
              </h3>
              <p className="text-gray-600">
                From planning to execution, we ensure that your projects are
                delivered on time and within scope.
              </p>
            </div>

            {/* Function 3 */}
            <div className="border rounded-lg p-6 shadow-lg bg-white">
              <div className="mb-4">
                <Settings className="w-10 h-10 text-yellow-500 mx-auto" />{" "}
                {/* Icon */}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Maintenance & Support
              </h3>
              <p className="text-gray-600">
                We offer ongoing maintenance and support to ensure your systems
                are always up and running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100" id="testimonials">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
          <p className="text-gray-700 mb-8">What our clients say about us.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded-lg p-6">
              <p className="text-gray-600 italic">&apos;Great service!&apos;</p>
              <p className="font-semibold">- Client Name</p>
            </div>
            <div className="border rounded-lg p-6">
              <p className="text-gray-600 italic">
                &apos;Helped me achieve my goals!&apos;
              </p>
              <p className="font-semibold">- Client Name</p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Us Section */}
      <section className="py-20 bg-white" id="contact">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            Feel free to reach out for any inquiries.
          </p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Get in Touch
          </button>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
