var express                 = require("express"),
    router                  = express.Router(),
    Farmer                  = require("../models/farmer"),
    Storage                 = require("../models/storage"),
    Transport               = require("../models/transport"),
    Vehicle                 = require("../models/vehicle"),
    User                    = require("../models/user");

router.get("/sahayata/farmer",function(req,res){
        res.render('farmer/farmer_index');
    });
router.get("/sahayata/farmer/new",function(req,res){
       res.render("farmer/farmer_new");
    });
router.post("/sahayata/farmer",function(req,res){
        Farmer.create(req.body.farmer,function(err,farmer){
           if(err){
               console.log(err);
               res.render("home");
           }else{
               res.redirect("/sahayata/farmer");
           }
        });
    });


module.exports = router;
