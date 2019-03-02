var mongoose=require("mongoose");

var vehicleSchema = new mongoose.Schema({
    type : String,
    vehicleNumber : String,
    capacity : String, // kg
    price : String, // rs/km
    booked:Boolean
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
