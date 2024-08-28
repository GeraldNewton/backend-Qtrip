const jwt=require("jsonwebtoken");
const {JWT_SECRETKEY}=require("../config")
const http=require("http-status")

const verifyToken=()=>async(req,res,next)=>{

// ? In Node.js and Express, HTTP headers are case-insensitive. 
// ? This means that the headers are normalized to lower case to ensure consistency. 
// ? When you access the headers using req.headers, the header names are automatically converted to lowercase.
// ? So, when you send a header like Authorization from Postman, it is received and 
// ? stored as authorization in the req.headers object. This behavior is compliant 
// ? with the HTTP/1.1 specification, which states that header field names are case-insensitive.

    const {authorization}=req.headers;
    const token=authorization.split(" ")[1];
    try{
        const match=await jwt.verify(token,JWT_SECRETKEY)
        next();
    }catch(e){
        if (e.name=="TokenExpiredError")
        res.status(http.UNAUTHORIZED).send({
            error:"Token Error",
            message: "token expired"
        });
        else
        res.status(http.UNAUTHORIZED).send({
            error:"Invalid Token",
            message: "Token provided is incorrect"
        });
    }
}

module.exports=verifyToken;

// ? when token is expired following error generates
// ? {
// ?     "name": "TokenExpiredError",
// ?     "message": "jwt expired",
// ?     "expiredAt": "2024-06-26T14:47:49.000Z"
// ? }
// ? when token is invalid following error generates
// ? {
// ?     "name": "JsonWebTokenError",
// ?     "message": "invalid token"
// ? }