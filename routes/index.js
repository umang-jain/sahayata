var express = require("express"),
    router  = express.Router();
router.post("/",function(req,res){
  console.log(req.body);
  // res.render("home");
  // res.send("home")
});

module.exports = router;
