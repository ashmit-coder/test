
const token = localStorage.getItem('token'); 

 export const socket = new WebSocket(`ws://localhost:8000/ws/socket/user?token=${token}`);

 socket.onopen = () => {
   console.log('WebSocket connection opened.');
   socket.send(JSON.stringify({ user_id }));
 };



    