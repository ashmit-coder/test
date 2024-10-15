import { Mail } from "lucide-react";

const Support = () => {
  return (
    <section
      id="support"
      className="mb-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.02]"
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">
        Support
      </h2>
      <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-6">
        Need assistance? Our support team is here to help you 24/7. Feel free to
        reach out for any inquiries or issues you may face.
      </p>
      <div className="flex justify-center">
        <button className="flex items-center gap-2 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
          <Mail className="w-5 h-5" />
          Contact Support
        </button>
      </div>
    </section>
  );
};

export default Support;
