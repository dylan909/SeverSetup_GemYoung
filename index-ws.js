const express = require("express");
const server = require("http").createServer();
const app = express();

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, () => {
  console.log("server on @ port 3000");
});

/**Begin web sockets */

const WebSocketServer = require("ws").Server;

const wss = new WebSocketServer({ server: server });

wss.on("connection", function broadcast(ws) {
  const numOfClients = wss.clients.size;
  console.log("clients connected: ", numOfClients);

  wss.broadcast(`current visitors: ${numOfClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send("welcome to my server");
  }

  wss.on("close", function close() {
    console.log("client has disconnected");
    console.log("clients connected: ", numOfClients);
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};
