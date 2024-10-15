
import { io } from 'socket.io-client';


const userId = "1"; // Replace with the actual user ID
export const newSocket = io("http://127.0.0.1:8000/", {
    query: {
        user_id: userId // Send the user ID as a query parameter
    },
    autoConnect:false
    
}).connect()



    