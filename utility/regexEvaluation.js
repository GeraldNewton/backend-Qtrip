const {REGEX_USERPASS}=require("../config")

const regexEvaluation=(value,helpers)=>{
    if(REGEX_USERPASS.test(value))
    return value;
    else
    return helpers.message('password should fullfill the following requirements of having atleast:one lowercase letter,one uppercase letter,one digit,one special character from the set `@$!%*?` & and should be at least 8 characters long')
}

module.exports=regexEvaluation