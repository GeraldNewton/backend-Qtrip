const dotenv=require("dotenv");
dotenv.config();

module.exports={
    MONGODB_URL:process.env.MONGODB_URL,
    JWT_SECRETKEY:process.env.JWT_SECRETKEY,
    JWT_EXPIRESIN:process.env.JWT_EXPIRESIN,
    REGEX_USERPASS:new RegExp(process.env.REGEX_USERPASS),
    PORT:process.env.PORT,
    RESERVATION_LIMIT:process.env.RESERVATION_LIMIT,
    MONGODB_URL_ORIGINAL:process.env.MONGODB_URL_ORIGINAL
}
