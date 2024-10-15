import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { LatLngContext } from './LatLngContext'; 

const containerStyle = {
  width: '100%',
  height: '440px',
};

const defaultCenter = {
  lat: 37.7749, 
  lng: -122.4194, 
};

const GoogleMapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY, 
  });

  const { pickupLatLng, dropLatLng } = useContext(LatLngContext); 
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    if (pickupLatLng && dropLatLng) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickupLatLng,
          destination: dropLatLng,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [pickupLatLng, dropLatLng]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={pickupLatLng || defaultCenter} 
      zoom={10}
      
    >

      {pickupLatLng && <Marker position={pickupLatLng} />}

      {dropLatLng && <Marker position={dropLatLng} />}

      {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleMapComponent;
