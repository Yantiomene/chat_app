const { Server } = require("socket.io");

const io = new Server({ cors: { origin: "*" } });

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  // Listen to a connection event
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });

    console.log("Online users:", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });
});
io.listen(3001);
