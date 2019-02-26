var express                 = require("express"),
    router                  = express.Router(),
    Farmer                  = require("../models/farmer"),
    Storage                 = require("../models/storage"),
    Transport               = require("../models/transport"),
    Vehicle                 = require("../models/vehicle"),
    Crop                    = require("../models/crop");

    var {User}                    = require("../models/user");

    router.get("/sahayata/transport",function(req,res){
      User.find().then((transports) => {
        res.send(JSON.stringify(transports));
      }, (err) => {
        res.status(400).send(err);
      });
    });

    router.post("/sahayata/transport",(req,res) => {
            User.create(req.body.transport).then((transport) => {
                   res.send(JSON.stringify(transport));
               },(err) => {
                 console.log(err);
                 res.status(400).send(err);
               });
    });
    router.get("/sahayata/transport/:id",function(req,res){
            User.findById(req.params.id).populate("vehicles").exec().then((transport) => {
                    if (!transport) {
                      return res.status(404).send();
                    }
                    res.send(JSON.stringify(transport));
                }).catch((e) => {
                  res.status(400).send();
                });
    });

    router.post('/sahayata/transport/:id', (req,res)=>{
      Vehicle.create(req.body.vehicles).then(vehicle=>{
        console.log('vehicle created');
        User.findById(req.params.id).then(user=>{
          console.log('inside findbyid');
          console.log(user);
          user.vehicles.push(vehicle);
          user.save();
          res.status(200).send(user);
        },e=>{console.log("user not found");
          return res.status(404).send(e);});
      },e=>{console.log("vehicle not created");return res.status(404).send(e);});
    });


// router.get("/sahayata/transport",function(req,res){
//   Transport.find().then((transports) => {
//     res.send(JSON.stringify(transports));
//   }, (err) => {
//     res.status(400).send(err);
//   });
// });
//
// router.post("/sahayata/transport",(req,res) => {
//         Transport.create(req.body.transport).then((transport) => {
//                res.send(JSON.stringify(transport));
//            },(err) => {
//              console.log(err);
//              res.status(400).send(err);
//            });
// });
// router.get("/sahayata/transport/:id",function(req,res){
//         Transport.findById(req.params.id).populate("vehicles").exec().then((transport) => {
//                 if (!transport) {
//                   return res.status(404).send();
//                 }
//                 res.send(JSON.stringify(transport));
//             }).catch((e) => {
//               res.status(400).send();
//             });
// });

module.exports = router;
