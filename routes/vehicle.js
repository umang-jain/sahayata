var express                 = require("express"),
    router                  = express.Router({mergeParams:true}),
    Farmer                  = require("../models/farmer"),
    Storage                 = require("../models/storage"),
    Transport               = require("../models/transport"),
    Vehicle                 = require("../models/vehicle"),
    User                    = require("../models/user");

router.get("/sahayata/transport/:id/vehicle/new",function(req,res){
      Transport.findById(req.params.id,(err,transport) => {
        if(err){
          console.log(err);
          res.redirect('/');
        }else{
          res.render("transport/transport_new",{transport});
        }
      });

    });
router.post('/sahayata/transport/:id/vehicle', (req,res) => {
      Transport.findById(req.params.id,(err,transport) => {
        if(err){
          console.log(err);
          res.redirect('/')
        }else{
          Vehicle.create(req.body.vehicle,(err,vehicle) => {
            if(err){
              console.log(err);
              res.redirect('/')
            }else{
              transport.vehicles.push(vehicle);
              transport.save();
              res.redirect('/sahayata/transport/:id/'+req.params.id)
            }
          });
        }
      });
    });


module.exports = router;
