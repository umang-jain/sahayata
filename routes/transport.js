var express                 = require("express"),
    router                  = express.Router(),
    Farmer                  = require("../models/farmer"),
    Storage                 = require("../models/storage"),
    Transport               = require("../models/transport"),
    Vehicle                 = require("../models/vehicle"),
    User                    = require("../models/user");

router.get("/sahayata/transport",function(req,res){
        res.render('transport/transport_index');
});
router.get("/sahayata/transport/new",function(req,res){
       res.render("transport/transport_new");
});
router.post("/sahayata/transport",function(req,res){
        Transport.create(req.body.transport,function(err,transport){
           if(err){
               console.log(err);
               res.render("home");
           }else{
               res.redirect("/sahayata/transport");
           }
        });
});
router.get("/sahayata/transport/:id",function(req,res){
        Transport.findById(req.params.id).populate("vehicles").exec(function(err,transport){
                if(err){
                    console.log(err);
                    res.redirect('/');
                }
                else{
                    res.render("tranport/transport_show",{transport})
                }
            });
});

module.exports = router;
