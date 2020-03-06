var express = require("express");
var router = express.Router();
var _ = require("lodash");
var { User } = require("../models/user");
var { authenticate } = require("../middleware/authenticate");

router.get("/auth",authenticate,(req,res)=>{
  res.status(200).send(req.user);
});

router.post("/login", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        console.log(user);
        res.status(200).send({ token: token, type: user.type,email: user.email,userId: user._id });
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

router.post("/register",(req,res)=>{
  var body = _.pick(req.body, 'email', 'password','type','firstName','mobileNo','sex','district','state');
  var user = new User(body);
  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      console.log("CREATED USER");
      res.status(200).send({ token: token, type: user.type });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/test",(req,res) => {
  res.send("qwerty");
})
router.get("/logout", (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

module.exports = router;
