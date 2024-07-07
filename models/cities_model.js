const mongoose=require("mongoose");

const cities = mongoose.model('MyCollection1', new mongoose.Schema({}, { strict: false }), 'cities');  // ?create empty schema and then give it any name and finally connect it to the collections from which you want to send data from
module.exports=cities;