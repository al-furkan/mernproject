const { Schema, default: mongoose} =require("mongoose");
const { defaultImagePath } = require("../secret");

//name,slug, image,description,prize,qantity
//sold, shipping
const productSchema = new Schema({
name:{
    type:String,
    required:[true, 'product name is required'],
    trim: true,
    minlength: [3, 'the leanght of user name can be minimum langth 3 characters'],
    maxlength: [150, 'the leanght of user name can be maximum langth 150characters'],
    
},
slug:{
    type:String,
    required:[true, 'Catagori slug is required'],
    unique:true,
    minlength: [3, 'the leanght of user name can be minimum langth 3 characters']
    
},

image:{
    type:Buffer,
    contentType: String, 
},
description:{
    type:String,
    required:[true, 'description is required'],
    trim: true,
    minlength: [3, 'the leanght of user name can be minimum langth 3 characters']
    
},
phone:{
    type:String,
    required:[true, 'User Phone is required'],
    
},


},{timestamps:true});


const product = mongoose.model('product', productSchema)



module.exports = product;