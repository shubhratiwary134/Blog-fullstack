const mongoose = require('mongoose')
const Schema=mongoose.Schema

const userSchema=  new Schema({
    username:{type:String,required:true,unique:true,min:4},
    password:{type:String,required:true}
})
const userModel =  mongoose.model('user',userSchema)

    module.exports=userModel 