const express=require("express")
const router=express.Router()
const {user}=require('./user')

router.post("/addUser",user.addUser)
router.get("/getUsers",user.getUsers)
router.post("/checklogin",user.checkLogin)
module.exports=router;