const cities=require("../models/cities_model");
const adventures=require("../models/adventures_model");
const adventure_details=require("../models/adventure_details");
const http=require("http-status");



// we have to return a function for it to have access to the req and response object using function currying
// ()=>()=>{} is called function currying and we used it to return the actual controller

const get=()=>async(req,res)=>{    
    const {get}=req.params;
    var response;
    // to handle if the database is down
    try{
        if(get=="cities")
        response=await cities.find();
        else if(get=="adventures"){
            const {city}=req.query;
            response=await adventures.find({city});
        }
        else if(get=="adventure-details")
        {
            const {name}=req.query;
            response=await adventure_details.find({name})
        }
        // to handle if the data for given value not found
        if(!response.length)
        return res.status(http.NOT_FOUND).send({error:"Not Found",message:"No data found for the given values"})
        res.send(response);
    }catch(e){
        res.send({error:"Not Available",message:"Internal Server Error"})
    }
};

module.exports=get;