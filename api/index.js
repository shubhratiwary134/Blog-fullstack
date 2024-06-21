const express = require('express')
const cors = require('cors')
const userModel = require('./db')
const app=express()
const mongoose= require('mongoose')
app.use(cors())

app.use(express.json())
mongoose.connect('mongodb+srv://shubhra-todo:shubhra-todo@cluster0.kjzuilm.mongodb.net/')
app.post('/register', async function(req,res){
   const username=req.body.nameInput
   const password =req.body.passInput
   await userModel.create({username,password})
   res.status(200).json({message:'hey there'})
})

app.listen(4000,console.log('the app is listening'))