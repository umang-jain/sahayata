var mongoose=require("mongoose");

var orderSchema = new mongoose.Schema({
    type:String,
    userobj:Object,
    serviceobj:Object,
    amount:String
});

module.exports = mongoose.model("Order", orderSchema);
