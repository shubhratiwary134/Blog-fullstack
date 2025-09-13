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
mongoose.connect(process.env.MONGO_URL)
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
app.get('/blogs',async(req,res)=>{
   try{
      const blogs = await Post.find().populate('author','username') // it finds all the posts and then adds the specific username field in the author 
      res.status(200).json(blogs)
   }catch(err){
      res.status(500).json({ message: 'Error fetching blogs' })
   }
})
app.delete('/deletePost/:id',async(req,res)=>{
   const token =req.cookies.token
   if (!token) {
      return res.status(403).send('Token is required');
    }
   jwt.verify(token,secret,async (err,decoded)=>{
      if (err) {
         return res.status(401).send('Invalid token');
       }
       const postId = req.params.id;
       const userId = decoded.id;
   
     try{
      const post = await Post.findById(postId)
      if (!post) {
         return res.status(404).send('Post not found');
       }
       if (post.author.toString() !== userId) {
         return res.status(403).send('You are not authorized to delete this post');
       }
       await Post.findByIdAndDelete(postId)
       res.status(200).send('Post deleted successfully')
     }catch(error){
      res.status(500).send('An error occurred')
     }
   })
})
app.get('/myPosts/:username',async (req,res)=>{
   const token = req.cookies.token
   if(!token){
      res.status(403).send('token is required')
   }
   try{
      jwt.verify(token,secret,async (err,decoded)=>{
         if(err) {
            res.status(401).send('invalid token')
         }
         const username = req.params.username
         const user = await User.findOne({username})
         const posts = await Post.find({author:user._id})  
         res.status(200).json({posts,decoded})
         
      })
   }catch(error){
      res.status(500).send('error fetching posts ')
   }
   

})
app.listen(4000,console.log('the app is listening'))