import React from 'react';
import { LatLngProvider } from '../components/LatLngContext';
import { LoadScript } from '@react-google-maps/api';
import BookingComponent from '../components/BookingComponent';
import GoogleMapComponent from '../components/MapComponent';

function NewRide() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY} libraries={['places']}>
        <LatLngProvider>
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
            Ride Booking App
          </h1>
          <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-16">
            {/* Left section for the booking form */}
            <div className="flex-1 bg-white shadow-lg p-8 rounded-lg border border-gray-200">
              <BookingComponent />
            </div>

            {/* Right section for the map */}
            <div className="flex-1 h-96 md:h-auto">
              <GoogleMapComponent />
            </div>
          </div>
        </LatLngProvider>
      </LoadScript>
    </div>
  );
}

export default NewRide;
