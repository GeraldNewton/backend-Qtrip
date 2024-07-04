const joi_schema_verifyCred=require("../utility/joi_schema_verifyCred")
const http=require("http-status");

const verifyCredentials=()=>(req,res,next)=>{
    const {username,password}=req.headers;
    const body={
        Username:`${username}`,
        password:`${password}`
    }
    const {error} = joi_schema_verifyCred.validate(body);
    if(error)
    return res.status(http.BAD_REQUEST).send({
        error:"Validation Error",
        message:"given credentials failed validation",
        error_array:error.details.map((val)=>val.message)
    });

    next();
}
module.exports=verifyCredentials