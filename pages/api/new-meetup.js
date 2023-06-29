import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://harsh_arora:iBk8oP6RjVv1O34V@cluster0.jfh4zpi.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db("meetups");

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    // console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup Added Successfully" });
  }
}
export default handler;
