const joi_schema_verifyReserv=require("../utility/joi_schema_verifyReserv")
const http=require("http-status");


const verifyReservation=()=>(req,res,next)=>{
    const {error} = joi_schema_verifyReserv.validate(req.body);
    if(error)
    return res.status(http.BAD_REQUEST).send({
        error:"Validation Error",
        message:"given reservation data is incorrect",
        error_array:error.details.map((val)=>val.message)
    });
    next();
}

module.exports=verifyReservation;