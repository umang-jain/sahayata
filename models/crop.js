var mongoose=require("mongoose");

var cropSchema = new mongoose.Schema({
    type : String,
    quantity : String,
    price : String
});

module.exports = mongoose.model("Crop", cropSchema);
