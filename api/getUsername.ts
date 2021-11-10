import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
const CONNECTION_STRING =
  "mongodb+srv://admin:root@cluster0.gauba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const client = await MongoClient.connect(CONNECTION_STRING);
  const db = await client.db("vercel");
  var result = await db.collection("demo").find().toArray();
  console.log(client);
  console.log(db);
  console.log(result);
  res.status(200).json(result);
};
