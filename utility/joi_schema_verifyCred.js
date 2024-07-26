const joi=require("joi");
const regexEvaluation=require("./regexEvaluation")


const joi_schema_verifyCred=joi.object({
    Username:joi.string().required(),
    password:joi.string().required().custom(regexEvaluation),
}).options({ abortEarly: false })


//! HELPS TO CONTINUE JOI TO VALIDATE DATE FOR ALL KEYS EVEN IF IT ENCOUNTERS SOME KEY WHICH FAILS VALIDATION
// ?By default, Joi stops validating after the first error (abortEarly: true). Setting it to false allows you to get a complete list of all validation errors at once, which can be helpful for displaying multiple error messages to the user.

module.exports=joi_schema_verifyCred;