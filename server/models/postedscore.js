const mongoose = require("mongoose");

const posted = new mongoose.Schema({
    _id_: String,
  date: String,
  scores_last_time: Boolean,
});
module.exports = mongoose.model("postedscore", posted);