const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001"
    }
  });

app.use(cors())

io.on('connection', socket => {
    console.log("a user connected: " + socket.id)
})

app.get("/api", (req, res) => {
    res.send({"data":"Hello world"})
})

server.listen(port, ()=> {
    console.log("listening on port 3000")
})