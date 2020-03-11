const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "session-cookies-practice";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(async err => {
  if (err) throw err;
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  await CRUDpractice(db);
  client.close();
});

async function CRUDpractice(db) {
  // USE table "practice"
  const collection = db.collection("practice");
  await collection.deleteMany({});
  // Create
  await collection.insertMany([
    { firstName: "工藤", lastName: "新衣", score: [100, 95, 98] },
    { firstName: "灰原", lastName: "哀", phone: "0912-123-213" },
    { firstName: "布美" }
  ]);
  // Read
  const test = await collection.findOne({ firstName: "工藤" });
  console.log(test.firstName);
  // Update
  await collection.updateOne(
    { firstName: "工藤" },
    { $set: { score: [99, 92, 43] } }
  );
  // Delete
  await collection.deleteOne({ firstName: "布美" });
}

module.exports = client;
