const user_model=require("../models/user_model");
const http=require("http-status")

const signup=()=>async(req,res)=>{
    const {username,password}=req.headers; // ! when data comes with headers the keys are converted into lowe case
    try{
        const response=await user_model.create({Username:username,password:password});
        res.status(http.CREATED).send(response);
    }catch(e){
        let obj={error:"Validation Error"};
        if(e.code=="11000")
        {
            const key=Object.values(e.keyValue);
            obj.message="a user with the Username "+key[0]+" already exits"
            res.status(http.BAD_REQUEST).send(obj)
        }
        else if(e.name=="ValidationError"){
            obj.message=e.errors.password.message
            res.status(http.BAD_REQUEST).send(obj);
        }
        else res.status(http.INTERNAL_SERVER_ERROR).send({error:"Not Available",message:"internal server error"})
    }
}

module.exports=signup;