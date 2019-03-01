const _                 = require('lodash');
const axios             = require('axios');

var express                 = require("express"),
    router                  = express.Router(),
    Warehouse               = require("../models/warehouse");
    order               = require("../models/order");

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
        User.findById(req.params.id).then(user=>{
          user.warehouses.push(warehouse);
          user.save();
          res.status(200).send(warehouse);
        },e=>{console.log("user not found");
          return res.status(404).send(e);});
      },e=>{console.log("storage not created");return res.status(404).send(e);});
    });
// ----------- BOOK warehouse --------------

router.post('/order/:id/storage/:warehouseid',(req,res) => {
  var userobj = {};
  var warehouseobj = {};
  User.findById(req.params.id)
  .then((user) => {
    userobj = user;
    return Warehouse.findById(req.params.warehouseid);
  })
  .then((warehouse) => {
    warehouseobj = warehouse;
    var days = req.body.days;
    var quant = Number(req.body.quantity);
    if((quant/1000) <= Number(warehouse.quantity)){
      var amount = days*quant*Number(warehouse.price);
      console.log(amount);
      return Order.create({
        type:"storage",
        userobj,
        warehouseobj,
        amount
      });
  }else{
    res.status(404).send("Warehouse capacity is not enough! Please choose another storage");
  }
  })
  .then((order) => {
    console.log(order);
  })
  .catch((err) => {
    res.status(404).send(err)
  });
});
//------------ GET ALL WAREHOUSES BELONGING TO A USER -------------

router.get("/sahayata/storage/:id",function(req,res){
  User.findById(req.params.id).populate("warehouses").exec().then((user) => {
          if (!user) {
            return res.status(404).send();
          }
          res.send(user.warehouses);
      }).catch((e) => {
        res.status(400).send(e);
      });
});

// ----------- GET ALL WAREHOUSES IRRESPECTIVE OF USER---------

router.get("/sahayata/storageall/:id", (req,res) => {
  var geometry = {};
  var storageArray = [];
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
    return Warehouse.find().lean();
  })
  .then((response) => {
    var promises = [];
    storageArray = response;
    storageArray.forEach((storage) => {
      var district = storage.district.split(' ').join('+');
      var state = storage.state.split(' ').join('+');
      var pincode = storage.pincode.split(' ').join('+');
      var add =` http://apis.mapmyindia.com/advancedmaps/v1/xs2v77bxvxu3ev6zxvwywj9tz3yqmqjv/geo_code?addr=${district}%2C+${state}&pin=${pincode}`;
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
      storageArray[index].location = geo;
    });
    return storageArray;
  })
  .then((a) => {
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
      storageArray[index].route = distance;
    })
    storageArray.sort(function(a,b){return a.route.length - b.route.length});
    res.send(storageArray);
  })
  .catch((err) => {
    res.status(400).send(err);
  })
});


module.exports = router;
