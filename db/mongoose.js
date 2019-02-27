var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
	// "mongodb://cluster0-shard-00-00-nzzml.mongodb.net:27017,cluster0-shard-00-01-nzzml.mongodb.net:27017,cluster0-shard-00-02-nzzml.mongodb.net:27017/test?replicaSet=Cluster0-shard-0"
	"mongodb://admin:admin123@ds351455.mlab.com:51455/sayahata",
	{ useNewUrlParser: true }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("we are connected!");
});

module.exports = { mongoose };
