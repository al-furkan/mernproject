const { Schema, default: mongoose} =require("mongoose");
const bcrypt =require("bcrypt");
const { defaultImagePath } = require("../secret");

const userSchema = new Schema({
name:{
    type:String,
    required:[true, 'User name is required'],
    trim: true,
    minlength: [3, 'the leanght of user name can be minimum langth 3 characters'],
    maxlength: [31, 'the leanght of user name can be minimum langth 31 characters'],
    
},
 email: {
    type:String,
    required:[true, 'User email is required'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
        validator: function (v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Please enter a valid Email'
    }
    
},
password:{
    type:String,
    required:[true, 'User password is required'],
    trim: true,
    minlength: [6, 'the leanght of user name can be minimum langth 6 characters'],
   set:(v)=> bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    
},
image:{
    type:String,
    default: defaultImagePath, 
},
address:{
    type:String,
    required:[true, 'User address is required'],
   
    
},
phone:{
    type:String,
    required:[true, 'User Phone is required'],
    
},
isAdmin: {
    type: Boolean,
    default: false,

},
isBanned: {
    type: Boolean,
    default: false,

},


},{timestamps:true});


const User = mongoose.model('Users', userSchema)



module.exports = User;