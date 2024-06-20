const express = require('express')
const cors = require('cors')
const app=express()
app.use(cors())

app.post('/register',(req,res)=>{
    // const username = req.body.nameInput // input from register.jsx
    // const password = req.body.passInput
    res.json('registered')
})

app.listen(4000,console.log('the app is listening'))