const _                 = require('lodash');

var express                 = require("express"),
    router                  = express.Router(),
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

//----------- Get all crops related to a user ---------------

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
        var body = _.pick(req.body,['crop','quantity','uses','processing','piceOfEquipment','costOfFinalProduct']);
      Crop.create(body).then(crop=>{
        User.findById(req.params.id).then(user=>{
          user.crops.push(crop);
          user.save();
          res.status(200).send(crop);
        },e=>{console.log("user not found");
          return res.status(404).send(e);});
      },e=>{console.log("crop not created");return res.status(404).send(e);});
    });

    //----------- past orders -------------

    router.get("/sahayata/farmer/:id/Order",function(req,res){
          User.findById(req.params.id).populate("orders").exec().then((user) => {
              if (!user) {
                  return res.status(404).send();
              }
              res.send(user.orders);
          }).catch((e) => {
              res.status(400).send();
          });
    });



  router.get("/profit",(req,res)=>{
    var cropName = "maize";
    var cropQuantity = 100;//kg
    var nearTrasport = 10;//km
    var nearestMandi = 100;//km
    var transportPrice = 5;//rs/km
    var nearestWarehouse = 12//km
    var nearestCropPrice = 12;//rs/kg // yet to solve that is that nearest or the effectiest
    var lastyearMaxPrice = 30;//rm/lg // yet to find
    var nearestWarehousePrice = 0.12;//kg/month
    var ans1  = (cropQuantity * nearestCropPrice) - (transportPrice * nearestMandi);
    var ans2  = (cropQuantity * lastyearMaxPrice) - (transportPrice * nearestWarehouse);
    var ans1json = {
      cropQuantity, nearestCropPrice,transportPrice,nearestMandi
    }
    var ans2json  = {
      cropQuantity, lastyearMaxPrice, transportPrice, nearestWarehouse
    }
    var data = {type1: ans1json,type2: ans2json, cropName: cropName, type1ans: ans1, type2ans: ans2};
    res.status(200).send(data);
    // console.log(res);
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
