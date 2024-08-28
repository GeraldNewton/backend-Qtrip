const bcrypt = require('bcryptjs');
const mongoose=require("mongoose");
const {REGEX_USERPASS}=require("../config")

const user_schema=mongoose.Schema({
    Username:{
        type:String,
        required:true,
        index:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:(val)=>REGEX_USERPASS.test(val),
            message:"password should fullfill the following requirements of having atleast:one lowercase letter,one uppercase letter,one digit,one special character from the set `@$!%*?` & and should be at least 8 characters long"
        }
    }
})

user_schema.methods.isPasswordMatch=async function(password){
    const match = await bcrypt.compare(password, this.password);  
    return match;
}

user_schema.pre("save",async function(next){
    const salt=await bcrypt.genSalt();
    const pass=await bcrypt.hash(this.password, salt);
    this.password=pass;
    return next();
})

const user_model=mongoose.model("user",user_schema);
module.exports=user_model;