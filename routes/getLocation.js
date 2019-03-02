var json = require("./city.list.json");

var locationOfPlace = function(place){
  json.map((element)=>{
    if(element.place == place){
      return element;
    }
  })
}

exports.locationOfPlace = locationOfPlace;
