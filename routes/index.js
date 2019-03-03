var express = require("express"),
    router  = express.Router();
const axios = require('axios');
var fun = require("./getLocation");
var json  = require("./city.list.json");
var datajson  = require("./dataCrop.json");

router.get("/",function(req,res){
   res.render("home");
});

//--------- GET ALL MARKET PRICES -------------------

router.get("/locationOfPlace/:place",(req,res)=> {
  // var place = "Delhi";
  json.map((element)=>{
    if(element.name == req.params.place){
      res.status(200).send(element);
    }
  })
});


router.get('/search/crop',(req,res) => {
    // var curerntLocation = req.user.location



    var curerntLocation = "12.753,80.1973"
    var url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001743878f6c84b47ad4f01a21039bbbacb&format=json&offset=1&limit=10`;
    var promises = [];
    var finalArray = [];
    axios({
        method:'get',
        url
    }).then((response) => {
          // var records = response.data.records;
          var records = datajson;
          //idar records dalna hai
          records.forEach((record) => {
            var district = record.district.split(' ').join('+');
            var state = record.state.split(' ').join('+');
            var market = record.market.split(' ').join('+');
            var address = `${market}%2C+${district}%2C+${state}`;
             var finalObj = {
              crop:record.commodity,
              market,
              district,
              state,
              min_price:record.min_price,
              max_price:record.max_price,
              modal_price:record.modal_price
            }
            finalArray.push(finalObj);
            var url2 = "http://apis.mapmyindia.com/advancedmaps/v1/92y9r5gi8qijrlncpup4vgtk29486oge/geo_code?addr="+address;
            promises.push(axios.get(url2));
          })
          return promises;
        }).then((e)=>{
          var resArray = Promise.all(promises);
          return resArray;
        }).then((arr) => {
          arr.forEach((res,index) => {
            var lat = res.data.results[0].lat;
            var lng = res.data.results[0].lng;
            var geometry = {
              lat,
              lng
            }
            finalArray[index].geometry = geometry
          });
          return finalArray;
        }).then((a) => {
          var pro = [];
          a.forEach((el) => {
              var add = el.geometry.lat + "," + el.geometry.lng;
              var url3 = `https://apis.mapmyindia.com/advancedmaps/v1/92y9r5gi8qijrlncpup4vgtk29486oge/distance?center=${curerntLocation}&pts=${add}&rtype=0`;
              pro.push(axios.get(url3));
          });
          return pro;
          return axios.get(`https://apis.mapmyindia.com/advancedmaps/v1/qhzshkcegmgi1qly99uhzhx9x7d72xhs/distance?center=${curerntLocation}&pts=${addressString}&rtype=0`);
        }).then((resp) => {
          var resuArray = Promise.all(resp);
          return resuArray;
        })
        .then((x) => {
          x.forEach((element,index) => {
            var distance = (element.data.results[0]);
            finalArray[index].route = distance;
          })
          finalArray.sort(function(a,b){return a.route.length - b.route.length});
          res.send(finalArray);
        })
        .catch(function (err) {
          res.status(400).send(err);
        });
});

// ----------- Return orders of a user ---------------

router.get("/sahayata/order/:id",function(req,res){
  User.findById(req.params.id).populate("orders").exec().then((user) => {
          if (!user) {
            return res.status(404).send();
          }
          res.send(user.orders);
      }).catch((e) => {
        res.status(400).send(e);
      });
});

module.exports = router;
