import { MongoClient } from "mongodb";

//server-side functions that are triggered when API requests are sent
async function handler(req, res) {
  //if statement ensures that only POST request executes the following code
  if (req.method === "POST") {
    const data = req.body;
    //establishes connection between mongoDB and application
    const client = await MongoClient.connect(
      "mongodb+srv://sheeva:sheeva1@cluster0.ienob.mongodb.net/habitIt?retryWrites=true&w=majority"
    );
    const db = client.db();
    //collection has all stored data in database object
    const habitItCollection = db.collection("habitIt");
    //adds new data object to collection
    const result = await habitItCollection.insertOne(data);
    console.log(result);
    //closes connection to database
    client.close();
    //res sends back a response object
    res.status(201).json({ message: "habit added successfully" });
  }
}

export default handler;
