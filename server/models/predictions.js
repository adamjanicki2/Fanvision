const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  date: String, //formatted as mm/dd/yyyy
  user_id: String,
  user_name: String,
  todays_predictions: Array,
  // An example of this array would be as follows:
  // todays_predictions: [
  //   {
  //     home_team: ATLANTA_HAWKS,
  //     away_team: BROOKLYN_NETS,
  //     predicted_winner: ATLANTA_HAWKS,
  //     predicted_margin: 19,

  //   },
  //   {
  //     home_team: BOSTON_CELTICS,
  //     away_team: WASHINGTON_WIZARDS,
  //     predicted_winner: BOSTON_CELTICS,
  //     predicted_margin: 17,
  //   }
  // ]
});

// compile model from schema
module.exports = mongoose.model("predictions", PredictionSchema);
