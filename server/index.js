const express = require("express");
const cors = require("cors");
const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {},
});

app.use(cors());

io.on("connection", async (socket) => {
  socket.on("sendmessage", (data) => {
    io.emit("message", data);
  });
});

http.listen(8090);
