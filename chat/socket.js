const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3001",
  },
});

let users = [];

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
    console.log(socket.id);
    io.emit("getUsers", users);
  });
  console.log("a user connected.");
  console.log(users);
  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(user);

    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
