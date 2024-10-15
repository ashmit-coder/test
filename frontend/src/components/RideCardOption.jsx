import {
  Package,
  MapPin,
  CheckCircle,
  IndianRupee,
  Loader2,
} from "lucide-react"; // Icons from lucide-react
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Import axios

const RideOptionCard = ({
  weightRange,
  distance,
  cost,
  src,
  dest,
  onContinue,
}) => {
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true); // Trigger loading state

    try {
      // Simulate a 3-second delay for searching
      setTimeout(async () => {
        setLoading(false); // Stop loading after 3 seconds

        // Send data to the backend
        await axios.post("/api/bookRide", {
          weightRange,
          distance,
          cost,
          source: src,
          destination: dest,
        });

        // Call the next action, such as moving to the next step in the booking flow
        onContinue();
      }, 3000);
    } catch (error) {
      console.error("Error while sending booking data to backend", error);
    }
  };

  return (
    <div className="px-2 py-4 bg-white shadow-lg rounded-lg border border-gray-200 my-4">
      <h2 className="text-md font-semibold text-gray-800 flex items-center mb-2">
        <Package className="mr-2 text-blue-500" /> Weight Range: {weightRange}
      </h2>
      <p className="text-md text-gray-600 flex items-center mb-2">
        <MapPin className="mr-2 text-green-500" /> Distance: {distance} km
      </p>
      <p className="text-md text-gray-600 flex items-center mb-4">
        <IndianRupee className="mr-2 text-yellow-500" /> Estimated Cost: {cost}
      </p>
      {loading ? (
        <div className="w-full flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-blue-500 w-6 h-6 mb-2" />
          <p className="text-md font-semibold text-gray-600">
            Searching for a driver...
          </p>
        </div>
      ) : (
        <button
          onClick={handleContinue}
          className="w-full bg-green-500 text-white py-2 rounded-md text-md font-semibold hover:bg-green-600 flex items-center justify-center"
        >
          <CheckCircle className="mr-2" /> Continue
        </button>
      )}
    </div>
  );
};

RideOptionCard.propTypes = {
  weightRange: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  dest: PropTypes.string.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default RideOptionCard;
