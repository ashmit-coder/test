import { useState, useContext, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { LatLngContext } from "./LatLngContext";
import RideOptionCard from "./RideCardOption";

const BookingComponent = () => {
  const [pickup, setPickup] = useState(null);
  const [dropup, setDrop] = useState(null);
  const [rideOptions, setRideOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { pickupLatLng, dropLatLng, setPickupLatLng, setDropLatLng } =
    useContext(LatLngContext);

  const getCords = (place, type) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place.geometry && place.geometry.location) {
        const latLng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        if (type === "pickup") {
          setPickupLatLng(latLng);
        } else if (type === "drop") {
          setDropLatLng(latLng);
        }
      }
    });
  };

  const calculateDistance = () => {
    setLoading(true);
    if (pickupLatLng && dropLatLng) {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [{ lat: pickupLatLng.lat, lng: pickupLatLng.lng }],
          destinations: [{ lat: dropLatLng.lat, lng: dropLatLng.lng }],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            const distanceValue =
              response.rows[0].elements[0].distance.value / 1000;
            generateRideOptions(distanceValue);
          }
          setLoading(false);
        }
      );
    }
  };

  const generateRideOptions = (distance) => {
    const options = [
      {
        weightRange: "1-10 kg",
        distance,
        cost: (distance * 20 * 1.003**10).toFixed(2),
      },
      {
        weightRange: "10-50 kg",
        distance,
        cost: (distance * 20* 1.003 ** 50).toFixed(2),
      },
      {
        weightRange: "50-200 kg",
        distance,
        cost: (distance * 20* 1.003**125).toFixed(2),
      },
      {
        weightRange: "200+ kg",
        distance,
        cost: (distance * 20* 1.003**200).toFixed(2),
      },
    ];
    setRideOptions(options);
  };

  const confirmBooking = (weightRange, distance, cost) => {
    alert(`Booking confirmed for ${weightRange} with a cost of $${cost}.`);
    // Add your booking confirmation logic here
  };

  useEffect(() => {
    if (pickupLatLng && dropLatLng) {
      calculateDistance();
    }
  }, [pickupLatLng, dropLatLng]);

  return (
    <div className="bg-white min-h-full py-8 px-4 shadow-lg rounded-r-2xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Book a New Ride</h1>

      {/* Pickup Location */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Pickup Location
        </label>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          selectProps={{
            pickup,
            onChange: (place) => {
              getCords(place, "pickup");
              setPickup(place);
            },
            isClearable: true,
            placeholder: "Enter Pickup Location",
            styles: {
              control: (provided) => ({
                ...provided,
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                padding: "0.5rem",
                fontSize: "16px",
                backgroundColor: "#F9FAFB",
              }),
              input: (provided) => ({
                ...provided,
                color: "black",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#E5E7EB" : "white",
                color: state.isFocused ? "#374151" : "black",
              }),
            },
          }}
        />
      </div>

      {/* Drop Location */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Drop Location
        </label>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          selectProps={{
            dropup,
            onChange: (place) => {
              setDrop(place);
              getCords(place, "drop");
            },
            isClearable: true,
            placeholder: "Enter Drop Location",
            styles: {
              control: (provided) => ({
                ...provided,
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                padding: "0.5rem",
                fontSize: "16px",
                backgroundColor: "#F9FAFB",
              }),
              input: (provided) => ({
                ...provided,
                color: "black",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#E5E7EB" : "white",
                color: state.isFocused ? "#374151" : "black",
              }),
            },
          }}
        />
      </div>

      <button
        onClick={calculateDistance}
        className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
      >
        {loading ? "Calculating..." : "Calculate Ride Options"}
      </button>

      {/* Ride Options */}
      <div className="mt-8">
        {rideOptions.length > 0 &&
          rideOptions.map((option, index) => (
            <RideOptionCard
              key={index}
              weightRange={option.weightRange}
              distance={option.distance.toFixed(2)}
              cost={option.cost}
              src={pickup}
              dest={dropup}
              onContinue={() =>
                confirmBooking(option.weightRange, option.distance, option.cost)
              }
            />
          ))}
      </div>
    </div>
  );
};

export default BookingComponent;
