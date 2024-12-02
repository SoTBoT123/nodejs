const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000; // Change if needed

// Serve a basic status endpoint
app.get("/", (req, res) => {
  res.send("WebSocket server is running.");
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Receive a message from a user
  socket.on("send_message", (data) => {
    console.log(`Message received from ${socket.id}: ${data}`);
    // Broadcast the message to all other users
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
