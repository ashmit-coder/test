import React, { useContext } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { LatLngContext } from './LatLngContext'; // Import LatLngContext

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 37.7749, // Default latitude (example: San Francisco)
  lng: -122.4194, // Default longitude (example: San Francisco)
};

const GoogleMapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY, // Use your API key here
    libraries: ['places']
  });

  const { pickupLatLng, dropLatLng } = useContext(LatLngContext); // Access lat/lng from context

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={pickupLatLng || defaultCenter} // Center map on pickup location or default
      zoom={12}
    >
      {/* Marker for Pickup Location */}
      {pickupLatLng && <Marker position={pickupLatLng} />}

      {/* Marker for Drop Location */}
      {dropLatLng && <Marker position={dropLatLng} />}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleMapComponent;
