var express                 = require("express"),
    router                  = express.Router({mergeParams:true}),
    Farmer                  = require("../models/farmer"),
    Storage                 = require("../models/storage"),
    Transport               = require("../models/transport"),
    Vehicle                 = require("../models/vehicle"),
    Crop                    = require("../models/crop"),

router.get("/sahayata/farmer/:id/crop/new",function(req,res){
      // Farmer.findById(req.params.id,(err,farmer) => {
      //   if(err){
      //     console.log(err);
      //     res.redirect('/');
      //   }else{
      //     res.render("crop/crop_new",{farmer});
      //   }
      // });
      res.send('sadasd')
    });
// router.post('/sahayata/farmer/:id/crop', (req,res) => {
//       Farmer.findById(req.params.id,(err,farmer) => {
//         if(err){
//           console.log(err);
//           res.redirect('/')
//         }else{
//           Crop.create(req.body.crop,(err,crop) => {
//             if(err){
//               console.log(err);
//               res.redirect('/')
//             }else{
//               farmer.crops.push(crop);
//               farmer.save();
//               res.redirect('/sahayata/farmer/'+req.params.id)
//             }
//           });
//         }
//       });
// });


module.exports = router;
