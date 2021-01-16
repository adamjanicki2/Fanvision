const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  date: String, //formatted as mm/dd/yyyy
  home_team: String,
  away_team: String,
  predicted_winner: String,
  predicted_margin: Number,
});

// compile model from schema
module.exports = mongoose.model("prediction", PredictionSchema);
