import { useEffect, useState } from 'react';

const DriverLocationSender = () => {
  const [driverLocation, setDriverLocation] = useState(null);

  const token = localStorage.getItem('token');  // JWT stored in localStorage
  const user_id = localStorage.getItem('user_id');  // user_id to whom the driver is sending location updates

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/socket/driver?token=${token}`);


    const locationInterval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const locationData = {
              user_id,  
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            socket.send(JSON.stringify(locationData));  
            setDriverLocation(locationData);  
        },
          (error) => {
            console.error("Error getting location: ", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      }
    }, 2000);  // Every 5 seconds, send the location

    return () => {
      clearInterval(locationInterval);
      socket.close();
    };
  }, [token, user_id]);

  return <div>Sending location updates...</div>;
};

export default DriverLocationSender;
