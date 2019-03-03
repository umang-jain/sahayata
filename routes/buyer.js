const _                 = require('lodash');
const axios             = require('axios');

var express                 = require("express"),
    router                  = express.Router(),
    Crop                 = require("../models/crop");

var { User }                    = require("../models/user");

router.get('/sahayata/buyer', (req, res) => {
  Crop.find().then((crops) => {
          res.send(crops);
        }, (err) => {
          res.status(400).send(err);
        });
});

module.exports = router;
