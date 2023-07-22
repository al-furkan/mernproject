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
            const id = req. params.id;
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

        const userExists = await User.exists({email: email})
        
        if(userExists){
            throw createError(409, 'User this email already exists.  please log in');
        }
         
        //create jwt
       const token= createJsonWebToken({name , email , password , Phone , address},jwtActivationkey,'10m');

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


        const newUser = {
            name,
            email,
            password,
            phone,
            address,
        };
        console.log(token);



        
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

module.exports = { getUsers, getUser, deleteUser, processRagister };