const mongoose=require("mongoose")


const reservation_schema=mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    adventureName:{
        type:String,
        required:true
    },
    date_of_visit:{
        type:Date,
        validate:{
            validator:(value)=>new Date()<value,
            message:"selected date should be greater than current date"
        },
        required:true
    },
    person:{
        type:Number,
        required:true,
        min:1
    },
    price:{
        type:Number,
        required:true
    },
    date_of_resevation:{
        type:Date,
        required:true
    }
})


reservation_schema.pre("save",(next)=>{
    this.date_of_resevation=new Date();
    return next();
})

const reservation_model=mongoose.model("reservation",reservation_schema)
module.exports=reservation_model
