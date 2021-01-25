const mongoose = require("mongoose");
const podium = new mongoose.Schema({
    gold: Object,
    silver: Object,
    bronze: Object,
});
module.exports = mongoose.model("podium", podium);