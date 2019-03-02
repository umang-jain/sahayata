const _                 = require('lodash');
const axios             = require('axios');

var express                 = require("express"),
    router                  = express.Router(),
    Vehicle                 = require("../models/vehicle");

var { User }                    = require("../models/user");

//------------ ADD Vehicle ----------------
    router.post('/sahayata/transport/:id', (req,res)=>{
      var body = _.pick(req.body,['type','vehicleNumber','capacity','price']);
      Vehicle.create(body).then(vehicle=>{
        User.findById(req.params.id).then(user=>{
          user.vehicles.push(vehicle);
          user.save();
          res.status(200).send(vehicle);
        },e=>{console.log("user not found");
          return res.status(404).send(e);});
      },e=>{console.log("storage not created");return res.status(404).send(e);});
    });

//----------- BOOK Vehicle ----------------

router.post('/order/:id/transport/:vehicleid',(req,res) => {
  var userobj = {};
  var serviceobj = {};
  User.findById(req.params.id)
  .then((user) => {
    userobj = user;
    return Vehicle.findById(req.params.vehicleid);
  })
  .then((vehicle) => {
    serviceobj = vehicle;
    var source = req.body.source;
    var destination = req.body.destination;
    var quant = Number(req.body.quantity);
    if((quant) <= Number(vehicle.capacity)){
      var amount = *quant*Number(warehouse.price);
      console.log(amount);
      return Order.create({
        type:"storage",
        userobj,
        serviceobj,
        amount
      });
  }else{
    res.status(404).send("Warehouse capacity is not enough! Please choose another storage");
  }
  })
  .then((order) => {
    res.send(order);
  })
  .catch((err) => {
    res.status(404).send(err)
  });
});

//--------- GET all Vehicles for a user -----------

router.get("/sahayata/transport/:id",function(req,res){
  User.findById(req.params.id).populate("vehicles").exec().then((user) => {
          if (!user) {
            return res.status(404).send();
          }
          res.send(user.vehicles);
      }).catch((e) => {
        res.status(400).send(e);
      });
});

//------- get all vehicles irrespective of a user-------------
router.get("/sahayata/transportall/:id", (req,res) => {
  var geometry = {};
  var transportArray = [];
  User.findById(req.params.id).then((user) =>{
    var userDistrict = user.district.split(' ').join('+');
    var userState = user.state.split(' ').join('+');
    var add = `${userDistrict}%2C+${userState}`;
    var url = `http://apis.mapmyindia.com/advancedmaps/v1/xs2v77bxvxu3ev6zxvwywj9tz3yqmqjv/geo_code?addr=${add}`
    return axios.get(url);
  })
  .then((response) => {
    geometry.lat = response.data.results[0].lat;
    geometry.lng = response.data.results[0].lng;
    return User.find({type:"transport"}).lean();
  })
  .then((response) => {
    var promises = [];
    transportArray = response;
    transportArray.forEach((transport) => {
      var district = transport.district.split(' ').join('+');
      var state = transport.state.split(' ').join('+');
      var add =` http://apis.mapmyindia.com/advancedmaps/v1/xs2v77bxvxu3ev6zxvwywj9tz3yqmqjv/geo_code?addr=${district}%2C+${state}`;
      promises.push(axios.get(add));
    });
    return promises;
  })
  .then((e)=>{
    var resArray = Promise.all(e);
    return resArray;
  })
  .then((arr) => {
    arr.forEach((res,index) => {
      var lat = res.data.results[0].lat;
      var lng = res.data.results[0].lng;
      var geo = {
        lat,
        lng
      }
      transportArray[index].location = geo;
    });
    return transportArray;
  })
  .then((a) => {
    console.log(a);
    var pro = [];
    a.forEach((el) => {
        var add = el.location.lat + "," + el.location.lng;
        var url3 = `https://apis.mapmyindia.com/advancedmaps/v1/xs2v77bxvxu3ev6zxvwywj9tz3yqmqjv/distance?center=${geometry.lat},${geometry.lng}&pts=${add}&rtype=0 `;
        pro.push(axios.get(url3));
    });
    return pro;
  })
  .then((resp) => {
    var resuArray = Promise.all(resp);
    return resuArray;
  })
  .then((x) => {
    x.forEach((element,index) => {
      var distance = (element.data.results[0]);
      transportArray[index].route = distance;
    })
    transportArray.sort(function(a,b){return a.route.length - b.route.length});
    res.send(transportArray);
  })
  .catch((err) => {
    res.status(400).send(err);
  })
});


    //
    // router.post("/sahayata/transport",(req,res) => {
    //         User.create(req.body.transport).then((transport) => {
    //                res.send(JSON.stringify(transport));
    //            },(err) => {
    //              console.log(err);
    //              res.status(400).send(err);
    //            });
    // });
    // router.get("/sahayata/transport/:id",function(req,res){
    //         User.findById(req.params.id).populate("vehicles").exec().then((transport) => {
    //                 if (!transport) {
    //                   return res.status(404).send();
    //                 }
    //                 res.send(JSON.stringify(transport));
    //             }).catch((e) => {
    //               res.status(400).send();
    //             });
    // });
    //
    // router.post('/sahayata/transport/:id', (req,res)=>{
    //   Vehicle.create(req.body.vehicles).then(vehicle=>{
    //     console.log('vehicle created');
    //     User.findById(req.params.id).then(user=>{
    //       console.log('inside findbyid');
    //       console.log(user);
    //       user.vehicles.push(vehicle);
    //       user.save();
    //       res.status(200).send(user);
    //     },e=>{console.log("user not found");
    //       return res.status(404).send(e);});
    //   },e=>{console.log("vehicle not created");return res.status(404).send(e);});
    // });


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
