var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    bodyparser              = require("body-parser"),
    methodoverride          = require("method-override"),
    expresssanitizer        = require("express-sanitizer"),
    // passport                = require('passport'),
    // LocalStrategy           = require('passport-local'),
    Farmer                  = require("./models/farmer"),
    Storage                 = require("./models/storage"),
    Transport               = require("./models/transport"),
    Vehicle                 = require("./models/vehicle"),
    User                    = require("./models/user");

var farmerRoutes            = require('./routes/farmer'),
    storageRoutes           = require('./routes/storage'),
    transportRoutes         = require('./routes/transport'),
    vehicleRoutes           = require('./routes/vehicle'),
    indexRoutes             = require('./routes/index');

var PORT = process.env.PORT || 3000;

app.use(expresssanitizer());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodoverride("_method"));

mongoose.connect("mongodb://localhost/sahayata", { useNewUrlParser: true });

//----------- ROUTES --------------

app.use(farmerRoutes);
app.use(storageRoutes);
app.use(transportRoutes);
app.use(vehicleRoutes);
app.use(indexRoutes);

//----------- PORT ----------------

app.listen(PORT,function(req,res){
   console.log("Starting Server on port 3000");
});
