const mongoose=require('mongoose')


const streamSchema=new mongoose.Schema({
   profile_url:{
    type:String
   },
   name:{
    type:String
   },
   email:{
    type:String
   },
   password:{
    type:String
   },
   number:{
    type:String
   },
   videos:{
    type:[{
     video_url:String,
    }]
   },
   images:{
    type:[{image_url:String}]
   }

})

const Stream=mongoose.model("spaceNest",streamSchema)
module.exports=Stream