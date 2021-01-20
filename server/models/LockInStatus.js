const mongoose = require("mongoose");

const status = new mongoose.Schema({
  
  googleid: String,
  date: String,
  status: Boolean,
  //unix time of last scrape
});
module.exports = mongoose.model("lockinstatus", status);