var mongoose=require("mongoose");

var warehouseSchema = new mongoose.Schema({
    name:String,
    manager:String,
    quantity : String,
    price : Number,
    location:String,
    address:String,
    state:String,
    district:String,
    pincode:Number
});

module.exports = mongoose.model("Warehouse", warehouseSchema);
