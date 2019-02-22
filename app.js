var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    bodyparser              = require("body-parser"),
    methodoverride          = require("method-override"),
    expresssanitizer        = require("express-sanitizer"),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local'),
    Farmer                  = require("./models/farmer"),
    Storage                 = require("./models/storage"),
    User                    = require("./models/user");

var PORT = process.env.PORT || 3000;

app.use(expresssanitizer());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodoverride("_method"));

mongoose.connect("mongodb://localhost/sahayata", { useNewUrlParser: true });

//---------- PASSPORT CONFIGURATION --------------

app.use(require('express-session')({
  secret : 'secret',
  resave: false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next) => {
  res.locals.currentUser = req.user;
  next();
});

//--------- ROUTES -------------

app.get("/",function(req,res){
  res.render("home");
});
app.get("/sahayata",function(req,res){
    res.render('index');
});
app.get("/sahayata/new",function(req,res){
   res.render("new");
});
app.post("/sahayata",function(req,res){
    Farmer.create(req.body.farmer,function(err,farmer){
       if(err){
           res.render("new");
       }else{
           res.redirect("/sahayata");
       }
    });
});


app.listen(PORT,function(req,res){
   console.log("Starting Server on port 3000");
});
