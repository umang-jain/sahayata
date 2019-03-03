var mongoose=require("mongoose");

var cropSchema = new mongoose.Schema({
    crop : String,
    uses: String,
    processing: String,
    processingEquipment : String,
    piceOfEquipment : String,
    costOfFinalProduct : String,
    quantity : String,
    image:String
});

module.exports = mongoose.model("Crop", cropSchema);
