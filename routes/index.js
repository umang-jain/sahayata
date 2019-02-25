var express = require("express"),
    router  = express.Router();
const axios = require('axios');

router.get("/",function(req,res){
   res.render("home");
});

router.get('/search',(req,res) => {
    // var curerntLocation = req.user.location
    // var curerntLocation =
    var url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001743878f6c84b47ad4f01a21039bbbacb&format=json&offset=1&limit=2`;
    var geoArray = [];
    var urlArray = [];

    axios({
        method:'get',
        url
    }).then((response) => {
          var records = response.data.records;
          records.forEach((record) => {
            var district = record.district.split(' ').join('+');
            var state = record.state.split(' ').join('+');
            var market = record.market.split(' ').join('+');
            var address = `${market}%2C+${district}%2C+${state}`;
            var url2 = "https://api.opencagedata.com/geocode/v1/json?q="+address+"&key=b187e020f62f44dc9626cd922e818805";
            urlArray.push(url2);
          })
          return urlArray;
        }).then((e)=>{
          e.forEach((url) => {
            axios.get(url)
              .then((response) => {
                  var geometry = response.data.results[0].geometry;
                  geoArray.push(geometry);
                })
                .catch((err) => {
                  console.log(err);
                  res.status(400).send();
                })
          })
          return geoArray
        }).then((arr) => {
          console.log(arr);
          res.send(arr);
        })
        .catch(function (err) {
          console.log(err);
          res.status(400).send();
        });
});

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371;
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

module.exports = router;
