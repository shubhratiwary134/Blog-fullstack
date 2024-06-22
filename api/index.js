const express = require('express')
const cors = require('cors')
const userModel = require('./db')
const bcrypt = require('bcryptjs')
const app=express()
const mongoose= require('mongoose')
const jwt = require('jsonwebtoken')
app.use(cors({credentials:true,origin:'http://localhost:5173'}))
const saltRound =10
const secret='shubhratiwary8'
mongoose.connect('mongodb+srv://shubhra-todo:shubhra-todo@cluster0.kjzuilm.mongodb.net/')
app.use(express.json())


app.post('/register', async function(req,res){
   const username=req.body.nameInput
   const password =req.body.passInput
   try{
      const hashedPassword = await bcrypt.hash(password,saltRound)
      await userModel.create({
         username,
         password:hashedPassword
      })
      res.status(200).json({message:'user created successfully'})
   }
  catch(error){
   res.status(400).json({message:'wrong input by the user '})
  }
})
app.post('/login',async function(req,res)
{
   const username=req.body.nameInput
   const password=req.body.passInput
   try{  
     const response=await userModel.findOne({username})
     if(!response){
      res.status(400).json({message:'user not found'})
     }
     const passwordCheck=await bcrypt.compare(password,response.password)
     if(passwordCheck){
      res.status(200)
     const token =jwt.sign({username,id:response._id},secret)
     res.cookie(token).json({message:'user found'})
      //(payload,security,options,callback function)
      

      //send token 
     }
     else{
      res.status(400).json({message:'incorrect password'})
     }
}catch(error){
   alert('there was an error logging in',error)
}
      
}
)

app.listen(4000,console.log('the app is listening'))