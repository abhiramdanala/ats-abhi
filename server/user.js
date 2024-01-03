const { PrismaClient } =require('@prisma/client');
const prisma=new PrismaClient()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const addUser=async(req,res)=>{
    try{
        console.log(req.body.password)
      const hashed= await bcrypt
  .hash(req.body.password, saltRounds)
  
  
  .catch(err => console.error(err.message))
       
        const re=await prisma.User.create({
            data:{
            firstname:req.body.firstname,
            lastname:req.body.lastname,email:req.body.email,role:req.body.role,gender:req.body.gender,password:hashed
        }})
        res.send(re)
    }
    catch(e){
        console.log(e)
    }
}

const checkLogin=async(req,res)=>{
    try{
        const user=await prisma.user.findUnique({
            where:{
                email:req.body.email
            }
        })
        console.log(user)
        if(!user){
            res.send("not registered")
    
        }
        else{
            
            try{
                const truth=await bcrypt.compare(req.body.password,user.password);
                console.log(truth)
                if(truth){
                    res.send("login successful")
                }
                else{
                    res.send("invalid password")
                }
            }
            catch(e){
                console.log(e)
            }
        }
    }
    catch(e){
        console.log(e)
    }
   
}
const getUsers=async(req,res)=>{
    const users=await prisma.User.findMany()
    res.send(users)
}




module.exports.user={addUser,getUsers,checkLogin};