var mongoose=require("mongoose");

var storageSchema = new mongoose.Schema({
    name:String,
    location:String,
    price:Number,
    capacity:Number
});

module.exports=mongoose.model("Storage",storageSchema);
