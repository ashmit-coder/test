import React, { useState, useContext } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { LatLngContext } from './LatLngContext'; 

const BookingComponent = () => {
   const [pickup, setPickup] = useState();
   const [dropup, setDrop] = useState();

   const { setPickupLatLng, setDropLatLng } = useContext(LatLngContext);

   const getCords = (place, type) => {
      const placeId = place.value.place_id;
      const service = new google.maps.places.PlacesService(document.createElement("div"));
      service.getDetails({ placeId }, (place, status) => {
         if (status === 'OK' && place.geometry && place.geometry.location) {
            const latLng = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            
            if (type === 'pickup') {
               setPickupLatLng(latLng); 
            } else if (type === 'drop') {
               setDropLatLng(latLng);
            }
         }
      });
   };

   return (
      <div className='border rounded-2xl p-10 border-black'>
         <h1 style={styles.header}>Book a New Ride</h1>
         <div style={styles.searchBarContainer}>
            <label style={styles.label}>Pickup Location</label>
            <GooglePlacesAutocomplete
               apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
               selectProps={{
                  pickup,
                  onChange: (place) => { getCords(place, "pickup"); setPickup(place); },
                  isClearable: true,
                  placeholder: 'Enter Pickup Location',
                  styles: {
                     control: (provided) => ({
                        ...provided,
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        padding: '5px',
                        marginBottom: '15px',
                        fontSize: '16px',
                     }),
                     input: (provided) => ({
                        ...provided,
                        color: 'black',
                     }),
                     option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused ? '#eee' : 'white',
                        color: state.isFocused ? '#333' : 'black',
                     }),
                  },
               }}
            />
         </div>

         <div style={styles.searchBarContainer}>
            <label style={styles.label}>Drop Location</label>
            <GooglePlacesAutocomplete
               apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
               selectProps={{
                  dropup,
                  onChange: (place) => { setDrop(place); getCords(place, "drop"); },
                  isClearable: true,
                  placeholder: 'Enter Drop Location',
                  styles: {
                     control: (provided) => ({
                        ...provided,
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        padding: '5px',
                        marginBottom: '15px',
                        fontSize: '16px',
                     }),
                     input: (provided) => ({
                        ...provided,
                        color: 'black',
                     }),
                     option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused ? '#eee' : 'white',
                        color: state.isFocused ? '#333' : 'black',
                     }),
                  },
               }}
            />
         </div>

         <button style={styles.button}>Book Ride</button>
      </div>
   );
};

const styles = {
   header: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
   },
   searchBarContainer: {
      width: '100%',
      marginBottom: '20px',
   },
   label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '16px',
      color: '#333',
   },
   button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#1E90FF', 
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
   },
};

export default BookingComponent;
