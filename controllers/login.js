const user_model=require("../models/user_model");
const jwt = require('jsonwebtoken');
const {JWT_SECRETKEY,JWT_EXPIRESIN}=require("../config")
const http=require("http-status")

const login=()=>async(req,res)=>{
    const {username,password}=req.headers; // ! when data comes with headers the keys are converted into lowe case
    const user=await user_model.findOne({Username:username});
    if(!user)
    res.status(http.NOT_FOUND).send({error:"Not Found",message:"User not found"})
    const match=await user.isPasswordMatch(password);
    if(match){
        const token = await jwt.sign({ password }, JWT_SECRETKEY , { expiresIn: JWT_EXPIRESIN });
        res.send(token);
    }    
    else
    res.status(http.UNAUTHORIZED).send({error:"unauthenticated user",message:"wrong password"});
     
}
module.exports=login;