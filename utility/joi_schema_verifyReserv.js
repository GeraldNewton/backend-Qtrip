const joi=require("joi");


const joi_schema_verifyReserv=joi.object({
    Username:joi.string().required().messages({
        "any.required":"Username is absent"
    }),
    date_of_reservation:joi.date().required().messages({
        "any.required":"date of reservation  is required"
    }),
    person:joi.number().required().messages({
        "any.required":"No. of people is required"
    }),
    adventureName:joi.string().required().messages({
        "any.required":"Adventure Name is required"
    }),
    price:joi.number().required().messages({
        "any.required":"price is required"
    }),
    date_of_visit:joi.date().greater(joi.ref("date_of_reservation")).required().messages({
        "date.greater":"date of visit should be after date of reservation",
        "any.required":"date of visit is required"
    })
}).options({ abortEarly: false })

module.exports=joi_schema_verifyReserv;

// ? joi.ref() helps you reference another key which is mentioned above the current key heredate_of_visit is mentioned above date_of_reservation