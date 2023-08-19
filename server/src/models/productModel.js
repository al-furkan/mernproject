const { Schema, default: mongoose} =require("mongoose");
//const { defaultImagePath } = require("../secret");
const Catagori = require('../models/catagoriModel');

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
description:{
    type:String,
    required:[true, 'description is required'],
    trim: true,
    minlength: [3, 'the leanght of user name can be minimum langth 3 characters']
    
},
price:{
    type:Number,
    required:[true, 'price is required'],
    trim: true,
    validate:{
        validator: (v)=>{
            return v>0;
        },
        message: (props ) =>{
              `${props.value}is not a valid Price ! prize must be gater then 0`

        },
    }
},
quantity:{
    type:Number,
    required:[true, 'product quantity is required'],
    trim: true,
    validate:{
        validator: (v)=>{
            return v>0;
        },
        message: (props ) =>{
              `${props.value}is not a valid quantity ! quantity must be gater then 0`

        },
    }
},
sold:{
    type:Number,
    required:[true, 'product sold is required'],
    trim: true,
    default: 0,
},
shipping:{
    type: Number,
    default: 0,//sgipping pain or free smothing amound
},
image:{
    type:Buffer,
    contentType: String, 
    require: [true,'user image is required'],
},

catagory:{
    type:Schema.Types.ObjectId,
    ref:Catagori,
    require: true,
}


},{timestamps:true});


const product = mongoose.model('product', productSchema)



module.exports = product;