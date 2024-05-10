const WebSocket = require("ws");
const { getMongoClient } = require("./database");

const sockets = [];

const initializeWebsocketServer = (server) => {
  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
  broadcastPrices();
};

const broadcastPrices = async () => {
  if (sockets.length > 0) {
    const prices = await getLatestPrices();
    sockets.forEach((socket) => sendPrices(socket, prices));
  }
  setTimeout(broadcastPrices, 500);
};

const onConnection = async (ws) => {
  console.log("New websocket connection");
  sockets.push(ws);
  ws.on("close", () => onDisconnect(ws));
};

const getLatestPrices = async () => {
  const client = getMongoClient();
  const result = await client
    .db("stockmarket")
    .collection("prices")
    .aggregate([
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $group: {
          _id: "$company",
          latestEntry: { $first: "$$ROOT" },
        },
      },
    ])
    .toArray();
  return result.map((entry) => entry.latestEntry);
};

const sendPrices = async (ws, prices) => {
  ws.send(JSON.stringify({ type: "prices", prices }));
};

const onDisconnect = (ws) => {
  console.log("Websocket disconnected");
  sockets.splice(sockets.indexOf(ws), 1);
  console.log("Remaining sockets:", sockets.length);
};

module.exports = { initializeWebsocketServer };
