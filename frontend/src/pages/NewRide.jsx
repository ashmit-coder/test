import { LatLngProvider } from "../components/LatLngContext";
import { LoadScript } from "@react-google-maps/api";
import BookingComponent from "../components/LoadingModal";
import GoogleMapComponent from "../components/MapComponent";
import Sidebar from "../components/Sidebar";

function NewRide() {
  return (
    <div className="h-screen">
      {" "}
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        libraries={["places"]}
      >
        <LatLngProvider>
          <div className="flex flex-col md:flex-row h-full">
            <Sidebar />

            <div className="w-full md:w-80 h-full overflow-y-auto rounded-r-2xl">
              {" "}
              <BookingComponent />
            </div>

            <div className="flex-1 h-full">
              {" "}
              <GoogleMapComponent />
            </div>
          </div>
        </LatLngProvider>
      </LoadScript>
    </div>
  );
}

export default NewRide;
