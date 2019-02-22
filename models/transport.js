var mongoose=require("mongoose");

var transportSchema = new mongoose.Schema({
    name:String,
    location:String,
    owner:String,
    contact:Number,
    vehicles:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Vehicle"
            }
        ]
});

module.exports=mongoose.model("Transport",transportSchema);
