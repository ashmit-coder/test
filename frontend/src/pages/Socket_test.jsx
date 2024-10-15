import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

function SocketTest() {
  const [otp, setOtp] = useState(null);
  const userId = "123";  // Replace with actual user ID from the auth system

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
      socket.send("hi");  // Send a message if needed
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      // When OTP is received, update the state
      if (event.data.startsWith("Your OTP is")) {
        setOtp(event.data);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup WebSocket on component unmount
    return () => {
      socket.close();
    };
  }, [userId]);

  return (
    <div>
      <h1>Ride Request System</h1>
      {otp ? <p>{otp}</p> : <p>No OTP yet.</p>}
    </div>
  );
}

export default SocketTest;
