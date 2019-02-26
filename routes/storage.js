var express                 = require("express"),
    router                  = express.Router(),
    Farmer                  = require("../models/farmer"),
    Storage                 = require("../models/storage"),
    Transport               = require("../models/transport"),
    Vehicle                 = require("../models/vehicle"),
    Crop                    = require("../models/crop");

    var {User}                    = require("../models/user");

    router.get("/sahayata/storage",function(req,res){
      User.find().then((storage) => {
        res.send(JSON.stringify(storage));
      }, (err) => {
        res.status(400).send(err);
      });
    });

    router.post("/sahayata/storage",(req,res) => {
      User.create(req.body.storage).then((storage) => {
             res.send(JSON.stringify(storage));
         },(err) => {
           console.log(err);
           res.status(400).send(err);
         });
    });

    router.get("/sahayata/storage/:id",function(req,res){
      User.findById(req.params.id).populate("storage").exec().then((storage) => {
              if (!storage) {
                return res.status(404).send();
              }
              res.send(JSON.stringify(storage));
          }).catch((e) => {
            res.status(400).send();
          });
    });

    router.post('/sahayata/storage/:id', (req,res)=>{
      Storage.create(req.body.storage).then(storage=>{
        console.log('storage created');
        User.findById(req.params.id).then(user=>{
          console.log('inside findbyid');
          console.log(user);
          user.warehouses.push(storage);
          user.save();
          res.status(200).send(user);
        },e=>{console.log("user not found");
          return res.status(404).send(e);});
      },e=>{console.log("storage not created");return res.status(404).send(e);});
    });

module.exports = router;
