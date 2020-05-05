const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);
const io = socketIO(server);

//Routes
const authRoutes = require("./routes/index");

const chatRoutes1 = require("./routes/CreateChat.js");
const chatRoutes2 = require("./routes/getAllChats.js");
const chatRoutes3 = require("./routes/getChat.js");
const chatRoutes4 = require("./routes/updateChat.js");
const chatRoutes5 = require("./routes/joinChat.js");
const chatRoutes6 = require("./routes/leaveChat.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  socket.on("chatMessage", (msg) => {
    console.log("msg Changed to: ", msg);
    io.emit("message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//Setting up database
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
});

app.use(express.json());

//Middlewares
app.use(cors());
app.use("/api/user", authRoutes);
app.use("/api/chat", chatRoutes2);
app.use("/api/chat", chatRoutes1);
app.use("/api/chat", chatRoutes3);
app.use("/api/chat", chatRoutes4);
app.use("/api/chat", chatRoutes5);
app.use("/api/chat", chatRoutes6);

server.listen(PORT, () => {
  console.log(`listening on ${PORT}.....`);
});
