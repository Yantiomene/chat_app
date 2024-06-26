const { Server } = require("socket.io");

const io = new Server({ cors: { origin: "*" } });

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  // Listen to a connection event
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });

    io.emit("getOnlineUsers", onlineUsers);
  });

  // Add message
  socket.on("sendMessage", (message) => {
    const recipient = onlineUsers.find((u) => u.userId === message.recipientId);
    if (recipient) {
      io.to(recipient.socketId).emit("getMessage", message);
      io.to(recipient.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  // Listen to a disconnect event
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});
io.listen(3001);
