var mongoose=require("mongoose");

var warehouseSchema = new mongoose.Schema({
    name:String,
    manager:String,
    quantity : String,
    price : String,
    location:String,
    booked:Boolean,
    address:String,
    state:String,
    district:String,
    pincode:String
});

module.exports = mongoose.model("Warehouse", warehouseSchema);