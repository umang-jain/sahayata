var mongoose = require("mongoose");

var farmerSchema = new mongoose.Schema({
    name:String,
    sex:String,
    location:String,
    state:String,
    city:String,
    lastCrop:String
});

module.exports = mongoose.model("Farmer",farmerSchema);
