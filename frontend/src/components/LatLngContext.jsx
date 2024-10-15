import React, { createContext, useState } from 'react';

// Create a context for lat/lng data
export const LatLngContext = createContext();

// Create a provider component
export const LatLngProvider = ({ children }) => {
  const [pickupLatLng, setPickupLatLng] = useState(null);
  const [dropLatLng, setDropLatLng] = useState(null);

  return (
    <LatLngContext.Provider value={{ pickupLatLng, setPickupLatLng, dropLatLng, setDropLatLng }}>
      {children}
    </LatLngContext.Provider>
  );
};
