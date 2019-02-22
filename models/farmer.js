var mongoose = require("mongoose");

var farmerSchema = new mongoose.Schema({
    name:String,
    age:Number
});

module.exports = mongoose.model("Farmer",farmerSchema);
