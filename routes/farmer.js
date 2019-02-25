var express                 = require("express"),
    router                  = express.Router(),
    Farmer                  = require("../models/farmer"),
    Storage                 = require("../models/storage"),
    Transport               = require("../models/transport"),
    Vehicle                 = require("../models/vehicle"),
    Crop                    = require("../models/crop"),
    User                    = require("../models/user");

router.get("/sahayata/farmer",function(req,res){
      Farmer.find().then((farmers) => {
        res.send(JSON.stringify(farmers));
      }, (err) => {
        res.status(400).send(err);
      });
    });
// router.get("/sahayata/farmer/new",function(req,res){
//        res.render("farmer/farmer_new");
//     });
router.post("/sahayata/farmer",function(req,res){
        Farmer.create(req.body.farmer).then((farmer) => {
               res.send(JSON.stringify(farmer));
           },(err) => {
             console.log(err);
             res.status(400).send(err);
        }).catch((e) => {
          res.status(400).send();
        });
});
router.get("/sahayata/farmer/:id",function(req,res){
      Farmer.findById(req.params.id).populate("crops").exec().then((farmer) => {
          if (!farmer) {
              return res.status(404).send();
          }
          res.send(JSON.stringify(farmer));
      }).catch((e) => {
          res.status(400).send();
      });
});

module.exports = router;
