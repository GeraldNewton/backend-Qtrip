const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const http=require("http-status");


const get=require("./controllers/get.js");
const signup=require("./controllers/signup.js");
const login=require("./controllers/login.js")
const verifyToken=require("./middlewares/verifyToken.js")
const verifyCredentials=require("./middlewares/verifyCredentials.js")
const {MONGODB_URL,PORT}=require("./config");
const user_model = require("./models/user_model.js");
const verifyReservation=require("./middlewares/verifyReservation.js")
const makeReservation=require("./controllers/makeResevation.js")
const deleteReservation=require("./controllers/deleteReservation.js")


const app=express();

app.use(express.json());
app.use(cors());





mongoose.connect(MONGODB_URL).then(async()=>{
    await user_model.init();// ! will force the control to wait untill init() creates the unique indexes for the model user_model for Username key
})


// ? you can also do db.users.createIndex( { "Username": 1 }, { unique: true } ) to create unique indexes for the model after mongoose connects to the mongodb and databse is created 
// ? above command is run in command prompt=>mongosh
// ? after everytime you do db.dropDatabase()
// ? for more info=>
// ? mongoose ->validation->The unique Option is Not a Validator->see in it= MongoDB unique indexes and FAQ
// ? https://www.mongodb.com/docs/manual/core/index-unique/
// ? https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndex/ 


app.get("/login",verifyCredentials(),login())
app.post("/signup",verifyCredentials(),signup())

app.get("/get/:get",verifyToken(),get())

app.post("/reservations",verifyToken(),verifyReservation(),makeReservation())
app.delete("/reservation",deleteReservation())

app.all("/*",(req,res)=>res.status(http.NOT_FOUND).send({error:"Not Found",message:"given url path is not found"}))

app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`);
})