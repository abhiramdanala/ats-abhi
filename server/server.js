const router=require('./routes') 
const express= require("express")
const app=express()
const cors = require("cors")
app.use(cors())
app.use(express.json());
app.listen(4000,()=>{
   console.log("server is running")
})
app.use('/',router)