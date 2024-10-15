import React, { createContext, useState } from 'react';


export const LatLngContext = createContext();


export const LatLngProvider = ({ children }) => {
  const [pickupLatLng, setPickupLatLng] = useState(null);
  const [dropLatLng, setDropLatLng] = useState(null);

  return (
    <LatLngContext.Provider value={{ pickupLatLng, setPickupLatLng, dropLatLng, setDropLatLng }}>
      {children}
    </LatLngContext.Provider>
  );
};
