var mongoose=require("mongoose");

var vehicleSchema = new mongoose.Schema({
    type : String,
    vehicleNumber : String,
    capacity : String,
    price : String
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
