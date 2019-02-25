var express = require("express"),
    router  = express.Router();
    app = express();
const axios = require('axios');

// router.get("/",function(req,res){
//    res.render("home");
// });

router.get('/search',(req,res) => {
    // var curerntLocation = req.user.location
    // var curerntLocation =
    var url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001743878f6c84b47ad4f01a21039bbbacb&format=json&offset=1&limit=100`;

    axios({
        method:'get',
        url
    })
    .then((response) => {
        var records = response.data.records;
        var address = '';
        records.forEach((record) => {
          var district = record.district;
          var state = record.state;
          var address = `${district}%2C+{state}`
          var url2 = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=b187e020f62f44dc9626cd922e81880`;
          axios({
            method:'get',
            url2
          })
          .then((response2) => {
            var geometry = response2.results.geometry;
            res.send(geometry)
          })
        })
        // res.send(response.data.records);
    })
    .catch(function (err) {
        console.log(err);
        res.status(400).send();
    });
});
// module.exports = router;
app.listen(3000,function(req,res){
   console.log("Starting Server on port 3000");
});
