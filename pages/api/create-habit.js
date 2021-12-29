import { MongoClient } from "mongodb";

//url = /api/create-habit

async function handler(req, res) {
  //ensures that only POST request can be made
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://sheeva:sheeva1@cluster0.ienob.mongodb.net/habitIt?retryWrites=true&w=majority"
    );
    const db = client.db();

    const habitItCollection = db.collection("habitIt");

    const result = await habitItCollection.insertOne(data);

    console.log(result);
    //add error handling with try catch

    client.close();
    res.status(201).json({ message: "habit added successfully" });
  }
}

export default handler;
