const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const router = require("./routes/index")
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const cors = require("cors");

const app = express()
mongoose.connect(config.mongoose.url).then(()=>{
    console.log("connected to mongodb")
})


app.use(cors({
    origin: ["https://lpucart.onrender.com/","http://localhost:5137/"],
    credentials: true,
}));


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
passport.use("jwt",jwtStrategy)
app.use("/api",router)

app.get("/",(req,res)=>{
    res.send("Hello welcome to Cart Project")
})

app.listen(config.port,()=>{
    console.log(`listening to port ${config.port}`)
})