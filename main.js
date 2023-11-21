const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const Cors = require("cors");
const BodyParser = require("body-parser");
//const { request } = require('wget');

const app = express();
const port = process.env.PORT || 3000;
const client = new MongoClient('mongodb+srv://kchuright:Kchuri300@cluster0.vlqcxpm.mongodb.net/?retryWrites=true&w=majority');
//const db = mongoose.connection;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
app.use(Cors());

var collection;

const Schema ={
  username: String,
  //score: Number
}

const leaderboardSchema =mongoose.model("Schema", Schema);

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
});

/*app.post("/create", async (req, res)=>{
  try{
    let result = await collection.insertOne({
      "username":req.body.username,
      //"score":req.body.score,
      "score":score,
    });
    res.send({"_id":result.insertedId});
  } catch (e){
    res.status(500).send({message:e.message});
  }
});*/

app.post("/", function(req, res){
  let newLeaderboard = new leaderboardSchema({
    username: request.body.username,
    //score: request.body.score
  })
  newLeaderboard.save();
  res.redirect("/leaderboard");
});

app.get("/leaderboard", async (req, res) => {
  try {
    let result = await collection.find({}, {_id:0}).sort({score:-1}).limit(3).toArray();
    res.send(result);
} catch (e) {
    res.status(500).send({ message: e.message });
}
});

app.listen("3000", async () => {
    try {
        await client.connect();
        collection = client.db("leaderboard").collection("leaderboard");
        //collection.createIndex({ "location": "2dsphere" });
    } catch (e) {
        console.error(e);
    }
});


/*const leaderboardSchema = new mongoose.Schema({
  name: String,
  score: Number,
});

const Leaderboard = mongoose.model('leaderboard', leaderboardSchema);

mongoose.connect('mongodb://localhost:27017/leaderboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Create a new leaderboard entry
app.post('/leaderboard', async (req, res) => {
  try {
    const { playerName, score } = req.body;
    const entry = new Leaderboard({ playerName, score });
    await entry.save();
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the leaderboard entry' });
  }
});

// Get the leaderboard
app.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the leaderboard' });
  }
});

// Define routes for leaderboard operations (e.g., add score, get leaderboard, etc.)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});*/