const mongoose=require("mongoose");

const adventures_details = mongoose.model('MyCollection3', new mongoose.Schema({}, { strict: false }), 'adventure_details');   //?create empty schema and then give it any name and finally connect it to the collections from which you want to send data from
module.exports=adventures_details;