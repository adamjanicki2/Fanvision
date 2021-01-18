const mongoose = require("mongoose");

const time = new mongoose.Schema({
    name: String,
  last_scrape: Number,
  //unix time of last scrape
});
module.exports = mongoose.model("Time", time);