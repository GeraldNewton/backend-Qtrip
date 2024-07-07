const mongoose=require("mongoose");

const adventures = mongoose.model('MyCollection2', new mongoose.Schema({}, { strict: false }), 'adventures');  //?create empty schema and then give it any name and finally connect it to the collections from which you want to send data from
module.exports=adventures;