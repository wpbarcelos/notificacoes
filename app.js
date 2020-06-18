const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const bodyParser = require("body-parser");
const { urlencoded } = require("express");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.resolve(__dirname, "public")));
app.use((request, response, next) => {
  request.io = io;
  next();
});

app.post("/send", (request, response) => {
  const data = request.body;
  console.log("data", data);
  request.io.sockets.emit("message", data);
  return response.json({ message: "Mensagem Propagada" });
});

io.on("connection", (socket) => {
  console.log("User connected");
});

http.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
