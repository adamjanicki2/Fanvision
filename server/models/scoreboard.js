const mongoose = require("mongoose");

const scoreboardSchema = new mongoose.Schema({
  name: String,
  user_id: String,
  googleid: String,
  current_score: Number,
  gold: Number,
  silver: Number,
  bronze: Number,
  last_day_score: Number,
});

// compile model from schema
module.exports = mongoose.model("scoreboard", scoreboardSchema);
