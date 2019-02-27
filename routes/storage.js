const _                 = require('lodash');

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
        var body = _.pick(req.body,['name','manager','quantity','price','address','state','district','pincode']);
       Warehouse.create(body).then(warehouse=>{
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

//------------ GET ALL WAREHOUSES BELONGING TO A USER -------------

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

// ----------- GET ALL WAREHOUSES IRRESPECTIVE OF USER---------

router.get("/sahayata/storageall/:id", (req,res) => {
  var geometry = {};
  User.findById(req.params.id).then((user) =>{
    var userDistrict = user.district.split(' ').join('+');
    var userState = user.state.split(' ').join('+');
    var userPincode = user.pincode;
    var add = `${userDistrict}%2C+${userState}%2C+${userPincode}`;
    console.log(add);
    return axios.get(`http://apis.mapmyindia.com/advancedmaps/v1/xs2v77bxvxu3ev6zxvwywj9tz3yqmqjv/geo_code?addr=${add}`);
  })
  .then((response) => {
    geometry.lat = response.data.results[0].lat;
    geometry.lng = response.data.results[0].lng;
    return Vehicle.find()
  })
  .then((response) => {
    // console.log(response);
  })
  .catch((err) => {
    res.status(400).send(err);
  })
});


module.exports = router;
