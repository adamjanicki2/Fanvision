const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  favorite_team: String,
  location: String,
  gold_dates: Array, //track what days the user topped the leaderboard
  silver_dates: Array,
  bronze_dates: Array,
  picture: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
