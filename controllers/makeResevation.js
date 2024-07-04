const user_model=require("../models/user_model")
const reservation_model=require("../models/reservation_model")
const http=require("http-status")

const makeReservation=()=>async(req,res)=>{
    const user=await user_model.findOne({Username:req.body.Username})
    if(!user)
    res.status(http.BAD_REQUEST).send({error:"UserName invalid",message:"Given username does not exists in database"})
    try{
        const response=await reservation_model.create(req.body);
        res.status(http.CREATED).send(response);
    }catch(e){
        if(e.name && e.name=="ValidationError"){
                const obj={
                error:"Valdiation Falied",
                message:e.message.slice(31,e.message.length)  //understood by looking at the e.message
            }
            res.status(http.BAD_REQUEST).json(obj);
        }
        else res.status(http.INTERNAL_SERVER_ERROR).send({error:"Not Available",message:"internal server error"})
    }
}

module.exports=makeReservation