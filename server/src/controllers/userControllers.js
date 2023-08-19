const createError = require('http-errors');
const jwt =require('jsonwebtoken');
const bcrypt =require('bcrypt');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const {  findWithId } = require('../servises/finditem');
//const { options } = require('../app');
//const { error } = require('console');
//const fs = require('fs').promises;
const { deleteImage } = require('../healper/deleteUser');
const { createJsonWebToken } = require('../healper/jesonwebtoken');
const { jwtActivationkey, jwtresetkey } = require('../secret');
const sendEmailWithNodeMailer = require('../healper/email');
const express = require('express');



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
        const user = await findWithId(id,options);

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
        //  html:`<h2> hello ${name}!</h2> 
        //  <p> please click here to <a href ="${CLIENT_URL}/api/users/activate/${token} target ="_blank"> 
        //  activate your accound </a></p>
         
        //  `

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

         await findWithId(User,id,options);
        const updateoptions ={ 
            new:true,
            runValidation: true,
            context:'query',
        };

        let updates={
       
    };


// name ,email, paswsword, phone ,image addresas,

    for(let key in req.body){
        if(['name','password','phone','address'].includes(key)){
            updates[key]=req.body[key];
        }
        else if(['email'].includes(key)){
            throw createError(400,'email can not updated');
        }
    }

    const image = req.file;

    if(image){
        if(image.size>1024*1024*2){
            throw createError(400,'Image file is to learge. It must be less then 2MB');
        }
        updates.image = image.buffer.toString('base64');
    }
       
    //delete updates.email;

    const updateUser =await User.findByIdAndUpdate(Userid,updates,updateoptions).select("-password");

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
const HandelbanduserByid = async(req , res, next)=>{
    try{
        const Userid = req.params.id;
         await findWithId(User,Userid);
         const updates={isBanned:true};
        const updateoptions ={ 
            new:true,
            runValidation: true,
            context:'query',
        };

    //delete updates.email;

    const updateUser =await User.findByIdAndUpdate(Userid,updates,updateoptions).select("-password");

     if(!updateUser){
        throw createError(404,'user was not banned successfuly');
     }


        return successResponse(res, {
            statusCode: 200,
            message: 'User was banned successfully',
            payload: {updateUser},
        });
    }
    
       catch(error){
        next(error);
       }
}
const UnHandelbanduserByid = async(req , res, next)=>{
    try{
        const Userid = req.params.id;
         await findWithId(User,Userid);
         const updates={isBanned:false};
        const updateoptions ={ 
            new:true,
            runValidation: true,
            context:'query',
        };

    //delete updates.email;

    const updateUser =await User.findByIdAndUpdate(Userid,updates,updateoptions).select("-password");

     if(!updateUser){
        throw createError(404,'user was not Unbanned successfuly');
     }


        return successResponse(res, {
            statusCode: 200,
            message: 'User was Unbanned successfully',
            payload: {updateUser},
        });
    }
    
       catch(error){
        next(error);
       }
}

const UpdatepasswordByid = async(req , res, next)=>{
    try{
        
        const { oldPassword , newPassword}=res.body;
        const Userid = req.params.id;
        const user = await findWithId(User,Userid);

        // compare the password
        const isPasswordmatch = await bcrypt.compare(oldPassword,user.password);
        if(!isPasswordmatch){
            throw createError(401,'OldPassword is not correct');
         }
         //const filter = {Userid};
          const updates={$set:{password:newPassword}};
        const updateoptions ={ 
         new:true,
           
         }

    // //delete updates.email;

    const updateUser =await User.findByIdAndUpdate(Userid,updates,updateoptions).select("-password");

      if(!updateUser){
         throw createError(404,'user was not updated successfuly');
      }


        return successResponse(res, {
            statusCode: 200,
            message: 'Password Updated successfully',
            payload: {updateUser},
        });
    }
    
       catch(error){
        next(error);
       }
}

const ForgetpasswordByid = async(req , res, next)=>{
    try{
         const {email}= req.body;
         const userdata = await User.findOne({email:email});
         if(!userdata){
            throw createError("Email did not Exit.Please enter Your Correct email or Registered now")
         }
          //create jwt
       const token= createJsonWebToken({email},
        jwtresetkey,'10m');

       // prepair email
       const emailData = {
         email,
         subject: 'Reset Password  Email',
          html:`<h2> hello ${userdata.name}!</h2> 
          <p> please click here to <a href ="${CLIENT_URL}/api/users/reset-password/${token} target ="_blank"> 
          Reset your accound </a></p>
         
         `

       }


       // send email with nodemail

       try{
        await sendEmailWithNodeMailer(emailData);
       }catch(error){
         next(createError(500,'failed to send resetPassword varification email'));
         return;

       }
       
        return successResponse(res, {
            statusCode: 200,
            message: 'FOrget Password Updated successfully',
            payload: {updateUser},
        });
    }
    
       catch(error){
        next(error);
       }
}


const ResetpasswordByid = async(req , res, next)=>{
    try{
         
        const {token, password} = req.body;
        const decoded =jwt.varify(token,jwtresetkey);
        const filter ={email: decoded.email};
        const update = {password: password};
        const options = {new: true};
        if(!decoded){
          throw createError(400,"Invalid or Expaired token");

        }
           
    const updateUser =await User.findOneAndUpdate(filter,update,options).select("-password");

    if(!updateUser){
       throw createError(404,'Password reset faild');
    }

       

        return successResponse(res, {
            statusCode: 200,
            message: 'Password Reset successfully',
        });
    }
    
       catch(error){
        next(error);
       }
}








module.exports = {
    getUsers,
    getUser,
    deleteUser,
    processRagister,
    activateUserAccound,
    UserUpdatebyid,
    HandelbanduserByid,
    UnHandelbanduserByid,
    UpdatepasswordByid,
    ForgetpasswordByid,
    ResetpasswordByid
 };