import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });


const userRooms = new Map<WebSocket, string>();


function updateRoomStats(roomId: string) {
  let count = 0;
  const roomClients: WebSocket[] = [];

  
  userRooms.forEach((room, client) => {
    if (room === roomId) {
      count++;
      roomClients.push(client);
    }
  });

  
  const payload = JSON.stringify({
    type: "update",
    payload: { count }
  });

  
  roomClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

wss.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("message", (data) => {
    try {
      const parsedData = JSON.parse(data.toString());

      
      if (parsedData.type === "join") {
        const roomId = parsedData.payload.roomId;
        userRooms.set(socket, roomId);
        console.log(`User joined room: ${roomId}`);
        
        
        updateRoomStats(roomId);
      }

      
      if (parsedData.type === "chat") {
        const roomId = userRooms.get(socket);
        if (!roomId) return;

        
        let currentRoomCount = 0;
        userRooms.forEach((room) => {
          if (room === roomId) currentRoomCount++;
        });

        
        if (currentRoomCount >= 2) {
          const messageToSend = JSON.stringify({
            type: "chat",
            payload: { message: parsedData.payload.message }
          });

          userRooms.forEach((room, client) => {
            if (
              room === roomId &&
              client !== socket && 
              client.readyState === WebSocket.OPEN
            ) {
              client.send(messageToSend);
            }
          });
        } else {
          console.log("Chat blocked: Waiting for more users.");
        }
      }
    } catch (e) {
      console.error("Failed to parse message", e);
    }
  });

  socket.on("close", () => {
    const roomId = userRooms.get(socket);
    userRooms.delete(socket);
    
    
    if (roomId) {
      updateRoomStats(roomId);
    }
    console.log("User disconnected");
  });
});

console.log("Server is running on ws://localhost:8080");