var mongoose = require("mongoose");

var farmerSchema = new mongoose.Schema({
    name:String,
    sex:String,
    location:String,
    state:String,
    city:String,
    lastCrop:String,
    crops:[
            {
                  type:mongoose.Schema.Types.ObjectId,
                  ref: "Crop"
            }
    ]
});

module.exports = mongoose.model("Farmer",farmerSchema);
