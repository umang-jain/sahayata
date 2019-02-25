var express  = require("express");
var router = express.Router();
var _ = require("lodash");
var { User } = require("../models/user");

router.post("/login",(req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      // res.header('x-auth', token).send(user);
      res.status(200).send({token: token, type: user.type});
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

router.post("/register",(req,res)=>{
  var body = _.pick(req.body, 'email', 'password', 'type');
  var user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    // console.log(user);
    res.status(200).send({token: token, type: user.type});
  }).catch((e) => {
    res.status(400).send(e);
  })
});

router.get("/logout",(req,res)=>{
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});


module.exports = router;
