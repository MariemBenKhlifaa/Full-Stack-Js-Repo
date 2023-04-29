const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3001",
  },
});

let users = [];
let messages = []; 

const addUser = (userId, socketId) => {
  console.log(userId);
  console.log(socketId);
  users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    const unsentMessages = messages.filter((msg) => msg.receiverId === userId);
    if (unsentMessages.length > 0) {
      unsentMessages.forEach(({ senderId, text }) => {
        io.to(socket.id).emit("getMessage", { senderId, text });
      });
  
      // Remove any unsent messages from the array
      messages = messages.filter((msg) => msg.receiverId !== userId);
    }
    io.emit("getUsers", users);
  
  });
  console.log("a user connected.");
  console.log(users);
  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      // If the user is connected, send the message
      io.to(user.socketId).emit("getMessage", { senderId, text });
    } else {
      // If the user is not connected, store the message
      messages.push({ receiverId, senderId, text });
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
