var mongoose=require("mongoose");

var transportSchema = new mongoose.Schema({
    name:String,
    location:String,
    owner:String,
    contact:Number,
    vehicle:Array
});

module.exports=mongoose.model("Transport",transportSchema);
