var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    bodyparser              = require("body-parser"),
    methodoverride          = require("method-override"),
    expresssanitizer        = require("express-sanitizer"),
    Farmer                  = require("./models/farmer");

var PORT = process.env.PORT || 3000;

app.use(expresssanitizer());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodoverride("_method"));

mongoose.connect("mongodb://localhost/sahayata", { useNewUrlParser: true });



app.get("/",function(req,res){
   res.render("home");
});
app.get("/sahayata/about",function(req,res){
    res.render("about");
})
app.get("/sahayata",function(req,res){
    Cloth.find({},function(err,clothes){
       if(err){
           console.log(err);
       }else{
           res.render("index",{clothes:clothes});
       }
    });
});

app.listen(PORT,function(req,res){
   console.log("Starting Server on port 3000");
});
