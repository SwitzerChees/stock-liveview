const { MongoClient } = require("mongodb");

let client;

const initializeMongoDB = async () => {
  const url =
    process.env.MONGODB_URL ||
    "mongodb://localhost:27017,localhost:27018,localhost:27019";
  client = new MongoClient(url);
  console.log(`Connecting to MongoDB at ${url}`);
  await client.connect();
  console.log("Connected to MongoDB");
};

const getMongoClient = () => {
  return client;
};

module.exports = { initializeMongoDB, getMongoClient };
