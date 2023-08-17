const { Schema, default: mongoose} =require("mongoose");

const catagoriSchema = new Schema({
name:{
    type:String,
    required:[true, 'Catagori name is required'],
    trim: true,
    unique:true,
    minlength: [3, 'the leanght of user name can be minimum langth 3 characters']
    
},
slug:{
    type:String,
    required:[true, 'Catagori slug is required'],
    trim: true,
    unique:true,
    minlength: [3, 'the leanght of user name can be minimum langth 3 characters']
    
},
 


},{timestamps:true});


const Catagori = mongoose.model('Catagori', catagoriSchema)



module.exports = Catagori;