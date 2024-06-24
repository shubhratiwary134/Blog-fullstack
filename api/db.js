const mongoose = require('mongoose')
const Schema=mongoose.Schema

const userSchema=  new Schema({
    username:{type:String,required:true,unique:true,min:4},
    password:{type:String,required:true}
})
const User =  mongoose.model('user',userSchema)
const postSchema = new Schema({
    title : {
        type:String,
        required:true
    },
    summary:{
        type:String
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const Post = mongoose.model('post',postSchema)

    module.exports={User,Post}