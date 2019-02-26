var express                 = require("express"),
    router                  = express.Router({mergeParams:true}),
    Farmer                  = require("../models/farmer"),
    Storage                 = require("../models/storage"),
    Transport               = require("../models/transport"),
    Vehicle                 = require("../models/vehicle"),
    Crop                    = require("../models/crop");

var  {User}                    = require("../models/user");

// router.get("/sahayata/transport/:id/vehicle/new",function(req,res){
//       Transport.findById(req.params.id,(err,transport) => {
//         if(err){
//           console.log(err);
//           res.redirect('/');
//         }else{
//           res.render("vehicle/vehicle_new",{transport});
//         }
//       });
//
//     });
// router.post('/sahayata/transport/:id/vehicle', (req,res) => {
//       User.findById(req.params.id,(err,user) => {
//         if(err){
//           res.status(400).send();
//         }else{
//           Vehicle.create(req.body.vehicle,(err,vehicle) => {
//             if(err){
//               res.status(400).send();
//             }else{
//               user.vehicles.push(vehicle);
//               user.save();
//               res.send(JSON.stringify(vehicle));
//             }
//           });
//         }
//       });
// });


module.exports = router;
