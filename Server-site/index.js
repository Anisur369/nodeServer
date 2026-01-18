const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://nodeServer:0KyxojWXoiqwWBto@anisur.kaax7ve.mongodb.net/?appName=anisur";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // db server connection
    const db = client.db("nodeServer");
    const usersCollection = db.collection("users");

    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.get('/users', async (req, res) => {
      const email = req.query.email;
      let query = {};
      if (email) {
        query = { email: email };
        const cursor = usersCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      }else{
        console.log("inside else");
      }
    });

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    app.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      console.log("ther is an my error", updatedUser);
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.updateOne(query, { $set: updatedUser });
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    // Ensures that the client will close when you finish/error
    // await client.close();
    console.error(err);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World! Server is running...');
});

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});

