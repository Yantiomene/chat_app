const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//const { MongoClient, ServerApiVersion} = require("mongodb");
const userRoute = require("./Routes/userRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

app.get("/api", (req, res) => {
    res.send("Welcome to our chat app APIs...");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})

const uri = process.env.ATLAS_URI;


mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log("MongoDB connection failed: ", err));

/*const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        const result = await client.db("admin").command({ listDatabases: 1, nameOnly: true});
        console.log("Databases:", result.databases);
        const db = client.db("chatApp");
        console.log("Successfully connected to MongoDB Atlas");
    } catch (e) {
        console.error("Error connecting to MongoDB: ", e);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);*/