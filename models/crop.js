var mongoose=require("mongoose");

var cropSchema = new mongoose.Schema({
    crop : String,
    quantity : String,
});

module.exports = mongoose.model("Crop", cropSchema);
