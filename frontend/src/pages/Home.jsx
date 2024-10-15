import Navbar from "../components/Navbar";

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
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700">
            We are dedicated to providing exceptional services that help you
            succeed in your ventures.
          </p>
        </div>
      </section>

      {/* Functions We Do Section */}
      <section className="py-20 bg-white" id="functions">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Functions We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold">Function 1</h3>
              <p className="text-gray-600">Description of function 1.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold">Function 2</h3>
              <p className="text-gray-600">Description of function 2.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold">Function 3</h3>
              <p className="text-gray-600">Description of function 3.</p>
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
