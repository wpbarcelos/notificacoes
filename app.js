const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const bodyParser = require("body-parser");
const { urlencoded } = require("express");

const secret_key = "minhasenha";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.resolve(__dirname, "public")));
app.use((request, response, next) => {
  request.io = io;
  next();
});

function verifyToken(request, response, next) {
  console.log(request.headers);
  const authorization = request.headers["authorization"];

  if (!!authorization) {
    if (authorization.trim() != secret_key) {
      return response.status(400).json({ message: "Invalid key" });
    } else {
      return next();
    }
  } else {
    return response
      .status(400)
      .json({ message: "Headers Authorization is required" });
  }
}

app.post("/send", verifyToken, (request, response) => {
  const data = request.body;
  request.io.sockets.emit("message", data);
  return response.json({ message: "Mensagem Propagada" });
});

io.on("connection", (socket) => {
  console.log("User connected");
});

http.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
