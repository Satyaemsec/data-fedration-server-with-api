const { MongoClient } = require("mongodb");
const url = "mongodb://0.0.0.0:27017";
const databaseName = "test2";
const client = new MongoClient(url);

async function dbConnect() {
  let result = await client.connect();
  db = result.db(databaseName);
  return db.collection("federationServer");
}

module.exports = dbConnect;