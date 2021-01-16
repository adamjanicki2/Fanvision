const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  date: String, //formatted as yyyy-mm-dd
  games: Array,
});

// compile model from schema
module.exports = mongoose.model("seasonSchedule", scheduleSchema);
