var express                 = require("express"),
    router                  = express.Router(),
    Farmer                  = require("../models/farmer"),
    Storage                 = require("../models/storage"),
    Transport               = require("../models/transport"),
    Vehicle                 = require("../models/vehicle"),
    Crop                    = require("../models/crop");

    var {User}                    = require("../models/user");

    // router.get("/sahayata/farmer",function(req,res){
    //       User.find().then((farmers) => {
    //         res.send(JSON.stringify(farmers));
    //       }, (err) => {
    //         res.status(400).send(err);
    //       });
    //     });
    //
    // router.post("/sahayata/farmer",function(req,res){
    //         User.create(req.body.farmer).then((farmer) => {
    //                res.send(JSON.stringify(farmer));
    //            },(err) => {
    //              console.log(err);
    //              res.status(400).send(err);
    //         }).catch((e) => {
    //           res.status(400).send();
    //         });
    // });

//----------- Get all crops ---------------

    router.get("/sahayata/farmer/:id",function(req,res){
          User.findById(req.params.id).populate("crops").exec().then((user) => {
              if (!user) {
                  return res.status(404).send();
              }
              res.send(user.crops);
          }).catch((e) => {
              res.status(400).send();
          });
    });

    //adding crops

    router.post('/sahayata/farmer/:id', (req,res)=>{
      Crop.create(req.body.crop).then(crop=>{
        User.findById(req.params.id).then(user=>{
          user.crops.push(crop);
          user.save();
          res.status(200).send(crop);
        },e=>{console.log("user not found");
          return res.status(404).send(e);});
      },e=>{console.log("crop not created");return res.status(404).send(e);});
    });


// router.get("/sahayata/farmer",function(req,res){
//       Farmer.find().then((farmers) => {
//         res.send(JSON.stringify(farmers));
//       }, (err) => {
//         res.status(400).send(err);
//       });
//     });
//
// router.post("/sahayata/farmer",function(req,res){
//         Farmer.create(req.body.farmer).then((farmer) => {
//                res.send(JSON.stringify(farmer));
//            },(err) => {
//              console.log(err);
//              res.status(400).send(err);
//         }).catch((e) => {
//           res.status(400).send();
//         });
// });
// router.get("/sahayata/farmer/:id",function(req,res){
//       Farmer.findById(req.params.id).populate("crops").exec().then((farmer) => {
//           if (!farmer) {
//               return res.status(404).send();
//           }
//           res.send(JSON.stringify(farmer));
//       }).catch((e) => {
//           res.status(400).send();
//       });
// });

module.exports = router;
