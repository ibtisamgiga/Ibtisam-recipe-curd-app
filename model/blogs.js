const mongoose=require('mongoose');
const validator=require('validator')
const Schema=mongoose.Schema;

const blogSchema=new Schema({
title:{type:String,required:true},
snippet:{type:String,required:true},
body:{type:String,required:true},
ownerId:{type:String},
imageUrl:{type:String
,
validate(value){
    if(!validator.isURL(value)){
        throw new Error('Please enter a valid url')
        
    }
}
},
ownerEmail:{type:String},


},{timestamps:true})


const Blog=mongoose.model('Blog',blogSchema)

module.exports=Blog