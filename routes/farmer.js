var express                 = require("express"),
    router                  = express.Router(),
    Farmer                  = require("../models/farmer"),
    Storage                 = require("../models/storage"),
    Transport               = require("../models/transport"),
    Vehicle                 = require("../models/vehicle"),
    Crop                    = require("../models/crop"),
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
router.get("/sahayata/farmer/:id",function(req,res){
        Farmer.findById(req.params.id).populate("crops").exec(function(err,farmer){
                if(err){
                    console.log(err);
                    res.redirect('/');
                }
                else{
                    res.render("farmer/farmer_show",{farmer})
                }
            });
});

module.exports = router;
