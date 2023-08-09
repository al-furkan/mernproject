const createError = require('http-errors');
const fs = require('fs').promises;


const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const {  findWithId } = require('../servises/finditem');
//const { options } = require('../app');
//const { error } = require('console');
const { deleteImage } = require('../healper/deleteUser');
const { createJsonWebToken } = require('../healper/jesonwebtoken');
const { jwtActivationkey } = require('../secret');
const sendEmailWithNodeMailer = require('../healper/email');
const e = require('express');



const getUsers = async(req , res, next)=>{
try{
    const search = req.query.search || "";
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

     const searchregExp = new RegExp('.*' + search + ".*",'i');

     const filter = {
        isAdmin: {$ne: true},
        $or:[  
            {name: {$regex: searchregExp}},
            {email: {$regex: searchregExp}},
            {Phone: {$regex: searchregExp}},
        ],
     };

     const options = { password: 0};

    const users = (await User. find(filter,options)).limit(limit).skip((page-1)*limit);

    const count = await User. find(filter).countDocuments();

    if(!users) throw createError(404," No users found")

    return successResponse(res, {
        statusCode: 200,
        message: 'users were returned successfuly',
        payload: { users,pagination:{
            totalPages: Math.ceil(count/limit),
            curentPage: page,
            previousPage: page-1>0 ? page-1: null,
            nextPage: page+1<=Math.ceil(count/limit)?page+1: null,
        },
    },
    });
     }catch(error){
    next(error);
   }
  }

const getUser = async(req , res, next)=>{
    try{
        const id = req. params.id;
        const options ={ password : 0};
        const user = await findWithId(id, options);

        return successResponse(res, {
            statusCode: 200,
            message: 'user were returned successfuly',
            payload: { 
                user,
            },
        
        });
    }
    
       catch(error){
        next(error);
       }
  }

const deleteUser = async(req , res, next)=>{
        try{
            const id = req.params.id;
            const options ={ password : 0};
            const user = await User. findWithId(id, options);
             
            const deleteUser = await User.findByIdAndDelete({_id: id, isAdmin: false,});
            const userImagePath = User.image;
  
           
            deleteImage(userImagePath);

        await User.findByIdAndDelete({
                _id: id,
                 isAdmin: false,
                })

            return successResponse(res, {
                statusCode: 200,
                message: 'User was deleted successfully',
            
            });
        }
        
           catch(error){
            next(error);
           }
  }

const processRagister = async(req , res, next)=>{
    try{

        const { name , email , password , Phone , address} = req.body;
        const image = req.file;

        if(!image){
            throw createError(400, 'Image file is required');
        }
        if(image.size>1024*1024*2){
            throw new Error('Image file is to learge');
        }

        const imageBufferString = image.buffer.toString('base64');

        const userExists = await User.exists({email: email})
        
        if(userExists){
            throw createError(409, 'User this email already exists.  please log in');
        }
         
        //create jwt
       const token= createJsonWebToken({name , email , password , Phone , address ,image:imageBufferString},
        jwtActivationkey,'10m');

       // prepair email
       const emailData = {
         email,
         subject: 'Account Activation Email',
         html:`<h2> hello ${name}!</h2> 
         <p> please click here to <a href =" ${CLIENT_URL}/api/users/activate/${token} target ="_blank"> 
         activate your accound </a></p>
         
         `

       }


       // send email with nodemail

       try{
        await sendEmailWithNodeMailer(emailData);
       }catch(error){
         next(createError(500,'failed to sendemail varification email'));
         return;

       }

        return successResponse(res, {
            statusCode: 200,
            message: `please  go to your ${email} for  completing your ragistation process`,
            payload: { token },
        });
    }
    
       catch(error){
        next(error);
       }
}


const activateUserAccound = async(req , res, next)=>{
    try{

    const token = req.body.token;
    if(!token)throw createError(404,'token not found');
   try{
    const decoder =jwt.varify(token,jwtActivationkey);
    if(!decoder) throw createError(401,"Unable to verify user");
    const userExists = await User.exists({email:decoder.email})
        
    if(userExists){
        throw createError(409, 'User this email already exists.  please log in');
    }


    await User.create(decoder);
       
    return successResponse(res,{
        statusCode:201,
        massage:'User was register successfuly'
    });
      
   }

   catch(error){
    if(error.name==='TokenExpiredError'){
        throw createError(401,'Token has expired');
    }
    else if(error.name==='jsonWebTokenError'){

           throw createError(401,'Invalid Token');
    }
    else{
        throw error;

   }
}
}
    
 catch(error){
        next(error);
       }
}
const UserUpdatebyid = async(req , res, next)=>{
    try{
        const Userid = req.params.id;
        const updateoptions ={ 
            new:true,
            runValidation: true,
            context:'query',
        };

        let updates={
       
    };


// name ,email, paswsword, phone ,image addresas,

    if(req.body.name){
            updates.name = req.body.name;
    }
    if(req.body.password){
            updates.password = req.body.password;
    }
    if(req.body.phone){
                updates.phone = req.body.phone;
    }
    if(req.body.address){
                updates.address = req.body.address;
    }

    const image = req.file;

    if(image){
        if(image.size>1024*1024*2){
            throw createError(400,'Image file is to learge. It must be less then 2MB');
        }
        updates.image = image.buffer.toString('base64');
    }
       

    const updateUser =await User.findByIdAndUpdate(Userid,updates,updateoptions);

     if(!updateUser){
        throw createError(404,'user with this id does not exist')
     }


        return successResponse(res, {
            statusCode: 200,
            message: 'User was Update successfully',
            payload: updateUser,
        });
    }
    
       catch(error){
        next(error);
       }
}
module.exports = { getUsers, getUser, deleteUser, processRagister,activateUserAccound,UserUpdatebyid };