var express                 = require("express"),
    router                  = express.Router(),
    Farmer                  = require("../models/farmer"),
    Storage                 = require("../models/storage"),
    Transport               = require("../models/transport"),
    Vehicle                 = require("../models/vehicle"),
    Crop                    = require("../models/crop"),
    User                    = require("../models/user");

router.get("/sahayata/transport",function(req,res){
  Transport.find().then((transports) => {
    res.send(JSON.stringify(transports));
  }, (err) => {
    res.status(400).send(err);
  });
});
// router.get("/sahayata/transport/new",function(req,res){
//        res.render("transport/transport_new");
// });
router.post("/sahayata/transport",(req,res) => {
        Transport.create(req.body.transport).then((transport) => {
               res.send(JSON.stringify(transport));
           },(err) => {
             console.log(err);
             res.status(400).send(err);
           });
});
router.get("/sahayata/transport/:id",function(req,res){
        Transport.findById(req.params.id).populate("vehicles").exec().then((transport) => {
                if (!transport) {
                  return res.status(404).send();
                }
                res.send(JSON.stringify(transport));
            }).catch((e) => {
              res.status(400).send();
            });
});

module.exports = router;
