const reservation_model = require("../models/reservation_model");
const adventure_details=require("../models/adventure_details")
const http=require("http-status")

const deleteReservation=()=>async(req,res)=>{
    const {id}=req.headers;
    const temp=await reservation_model.findById(id)
    adventure = await adventure_details.findOne({ name: temp.adventureName});
    if(!temp || !adventure)
    res.status(http.BAD_REQUEST).send({error:"Cannot delete Reservation",message:"No Reservaation for particular adventure exists"})
    if (adventure.count == 5) adventure.available = true;
    adventure.count-=1;
    await adventure.save();
    const response=await reservation_model.findByIdAndDelete(id)
    res.status(http.OK).send({...response._doc});
}

module.exports=deleteReservation