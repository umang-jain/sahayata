var express                 = require("express"),
    router                  = express.Router(),
    Farmer                  = require("../models/farmer"),
    Warehouse               = require("../models/warehouse"),
    Transport               = require("../models/transport"),
    Vehicle                 = require("../models/vehicle"),
    Crop                    = require("../models/crop");

    var {User}                    = require("../models/user");

    // router.get("/sahayata/storage",function(req,res){
    //   User.find().then((storage) => {
    //     res.send(JSON.stringify(storage));
    //   }, (err) => {
    //     res.status(400).send(err);
    //   });
    // });
    //
    // router.post("/sahayata/storage",(req,res) => {
    //   User.create(req.body.storage).then((storage) => {
    //          res.send(JSON.stringify(storage));
    //      },(err) => {
    //        console.log(err);
    //        res.status(400).send(err);
    //      });
    // });
    //



//------------- ADD WAREHOUSE ------------------

    router.post('/sahayata/storage/:id', (req,res)=>{
       Warehouse.create(req.body.warehouse).then(warehouse=>{
        console.log('storage created');
        User.findById(req.params.id).then(user=>{
          console.log('inside findbyid');
          console.log(user);
          user.warehouses.push(warehouse);
          user.save();
          res.status(200).send(warehouse);
        },e=>{console.log("user not found");
          return res.status(404).send(e);});
      },e=>{console.log("storage not created");return res.status(404).send(e);});
    });

//------------ GET ALL WAREHOUSES -------------

router.get("/sahayata/storage/:id",function(req,res){
  User.findById(req.params.id).populate("warehouses").exec().then((user) => {
          if (!user) {
            return res.status(404).send();
          }
          console.log(user);
          res.send(user.warehouses);
      }).catch((e) => {
        res.status(400).send(e);
      });
});

module.exports = router;
