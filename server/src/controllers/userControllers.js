const createError = require('http-errors');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const  mongoose  = require('mongoose');



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
        const options = {password: 0};
        const user =await User.findById(id, options);

        if (!!user){
            throw createError(404, 'user does not exist with this id');
        }

        return successResponse(res, {
            statusCode: 200,
            message: 'user were returned successfuly',
            payload: { 
                user,
            },
        
        });
    }
    
       catch(error){
        if(error instanceof mongoose.Error){
            next(createError(404, "Invalid User Id"))
        }
        next(error);
       }
    }

module.exports = { getUsers, getUser };