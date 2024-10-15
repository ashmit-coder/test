import React from 'react';
import { LatLngProvider } from '../components/LatLngContext';
import BookingComponent from '../components/BookingComponent';
import GoogleMapComponent from '../components/MapComponent';

function NewRide() {
  return (
    <div className='p-10'>
    <LatLngProvider>
        <h1> Ride Booking app</h1>
      <div className='flex p-10'>
    
        <BookingComponent />


        <GoogleMapComponent/>

      </div>
    </LatLngProvider>
    </div>
  );
}

export default NewRide;
