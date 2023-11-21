const express = require('express');
const mongoose = require('mongoose');
const Leaderboard = require('leaderBoard');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://kchuright:Kchuri300@cluster0.vlqcxpm.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Define routes for leaderboard operations (e.g., add score, get leaderboard, etc.)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});