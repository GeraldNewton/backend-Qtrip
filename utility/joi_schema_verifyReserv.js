const joi=require("joi");


const joi_schema_verifyReserv=joi.object({
    Username:joi.string().required(),
    date_of_visit:joi.date().greater('now').required(),
    person:joi.number().min(1).required(),
    adventureName:joi.string().required(),
    price:joi.number().required(),
    date_of_resevation:joi.date().required()
}).options({ abortEarly: false })

module.exports=joi_schema_verifyReserv;
