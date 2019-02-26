var express = require("express"),
    router  = express.Router();
const axios = require('axios');

router.get("/",function(req,res){
   res.render("home");
});

router.get('/search',(req,res) => {
    // var curerntLocation = req.user.location
    var curerntLocation = "28.686273800000002,77.2217831"
    var url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001743878f6c84b47ad4f01a21039bbbacb&format=json&offset=1&limit=2`;
    var promises = [];

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
            var url2 = "http://apis.mapmyindia.com/advancedmaps/v1/xs2v77bxvxu3ev6zxvwywj9tz3yqmqjv/geo_code?addr="+address;
            promises.push(axios.get(url2));
          })
          return promises;
        }).then((e)=>{
          var resArray = Promise.all(promises);
          return resArray;
        }).then((arr) => {
          console.log(arr);
          var geoArray = [];
          arr.forEach((res) => {
            var lat = res.data.results[0].lat;
            var lng = res.data.results[0].lng;
            var geometry = {
              lat,
              lng
            }
            geoArray.push(geometry)
          });
          var addresslatlng = "";
          var latlngarray = [];
          geoArray.forEach((geo) => {
             addresslatlng = geo.lat + "," + geo.lng;
             latlngarray.push(addresslatlng);
           });
           return latlngarray;
        }).then((a) => {
          console.log(a);
          // var addressString = a.join('|');
          // return axios.get(`https://apis.mapmyindia.com/advancedmaps/v1/xs2v77bxvxu3ev6zxvwywj9tz3yqmqjv/distance?center=${curerntLocation}&pts=${addressString}&rtype=0`);
        // }).then((res) => {
          // var disarray = res.data.results;
          // disarray.sort(function(a, b){return a.length - b.length});
        })
        .catch(function (err) {
          console.log(err);
          res.status(400).send();
        });
});

module.exports = router;
