var mongoose=require("mongoose");

var vehicleSchema = new mongoose.Schema({
    name : String,
    vehicleNumber : String,
    capacity : Number,
    price : Number
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
