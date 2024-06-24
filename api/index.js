const express = require('express')
const cors = require('cors')
const{ User , Post } = require('./db')
const bcrypt = require('bcryptjs')
const app=express()
const mongoose= require('mongoose')
const jwt = require('jsonwebtoken')
const cookieParser=require('cookie-parser')
app.use(cors({credentials:true,origin:'http://localhost:5173'}))
const saltRound =10
const secret='shubhratiwary8'
mongoose.connect('mongodb+srv://shubhra-todo:shubhra-todo@cluster0.kjzuilm.mongodb.net/')
app.use(express.json())
app.use(cookieParser())


app.post('/register', async function(req,res){
   const username=req.body.nameInput
   const password =req.body.passInput
   try{
      const hashedPassword = await bcrypt.hash(password,saltRound)
      await User.create({
         username,
         password:hashedPassword
      })
      res.status(200).json({message:'user created successfully'})
   }
  catch(error){
   res.status(400).json({message:'incorrect field'})
   
  }
})
app.post('/login',async function(req,res)
{
   const username=req.body.nameInput
   const password=req.body.passInput
   try{  
     const response=await User.findOne({username})
     if(!response){
      res.status(400).json({message:'user not found'})
     }
     const passwordCheck=await bcrypt.compare(password,response.password)
     if(passwordCheck){
      res.status(200)
     const token = jwt.sign({username,id:response._id},secret)
     res.cookie('token', token, { httpOnly: true }).json({ message: 'User found' })
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
app.get('/protected',(req,res)=>{
   const token = req.cookies.token
  
   if (!token) {
      return res.status(403).send('Token is required');
    }
    jwt.verify(token,secret,(err,decoded)=>{
      if(err){
         return res.status(401).send('Invalid token')
      }
      res.status(200).json({ message: 'This is a protected route', user: decoded })
    })
    
})
app.post('/logout',(req,res)=>{
   res.clearCookie('token') //clearing cookie 
   res.status(200).json({message:'logged out successfully'})
})
app.post('/createPost',async (req,res)=>{
   const token = req.cookies.token
   if (!token) {
      return res.status(403).send('Token is required');
    }
     jwt.verify(token,secret,async (err,decoded)=>{
      if(err){
         return res.status(401).send('Invalid token')
      }
      const {title,summary,content}=req.body
      const id = decoded.id
      try{
         await Post.create({
            title,
            summary,
            content,
            author:id
         })
         res.status(201).json({message:'user created successfully'})
      }catch(err){
         res.status(400).json({message:'unable to create a post '})
      }
  
    })
   
})
app.listen(4000,console.log('the app is listening'))