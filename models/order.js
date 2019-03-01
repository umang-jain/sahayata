var mongoose=require("mongoose");

var orderSchema = new mongoose.Schema({
    type:String,
    name:String,
    manager:String,
    quantity : String,
    price : String,
    location:String,
    address:String,
    state:String,
    district:String,
    pincode:String
});

module.exports = mongoose.model("Order", orderSchema);
