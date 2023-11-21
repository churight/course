const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const path = require('path');
//const Leaderboard = require('leaderBoard');

//const leaderboardSchema =require('leaderBoard.js');
const app = express();
const port = process.env.PORT || 3000;

const leaderboardSchema = new mongoose.Schema({
  name: String,
  score: Number,
});

//mongoose.connect('mongodb+srv://kchuright:Kchuri300@cluster0.vlqcxpm.mongodb.net/', {
mongoose.connect('mongodb://localhost:27017/leaderboard', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//module.exports=mongoose.model('Leaderboard', leaderboardSchema);

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
const db = mongoose.connection;

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

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'index.html'));
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
});