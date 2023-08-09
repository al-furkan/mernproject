const createError = require('http-errors');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const { createJsonWebToken } = require('../healper/jesonwebtoken');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const { jwtaccesskey } = require('../secret');



const handleLogin= async(req, res, next)=>{

    try {
        //email, password req body

        const {email, password} = req.body;
        // isExist
     const user = await User.findOne({email});
     if(!user){
        throw createError(404,'User does not exist with this email.please register first');
     }
        // compare the password
        const isPasswordmatch = await bcrypt.compare(password,user.password);
        if(!isPasswordmatch){
            throw createError(401,'Email/Password did not match');
         }
        // isBanned
        if(!user.isBanned){
            throw createError(403,'You are banned .please contact authority');
         }
        // token, cooking
         //create jwt
       const accessToken= createJsonWebToken({user},
        jwtaccesskey,'15m');

        res.cookie('accessToken',accessToken,{
            maxAge:15*60*1000,
            httpOnly:true,
            secure: true,
            sameSite:'none'
        })

       //success response
       return successResponse(res,{
        statusCode:200,
        message:'user Login successfully',
        payload:{user}
       })
    } catch (error) {
        next(error);
    }


}

const handleLogout= async(req, res, next)=>{

    try {
        res.clearCookie('accessToken');
        
       //success response
       return successResponse(res,{
        statusCode:200,
        message:'user Logout successfully',
        payload:{}
       })
    } catch (error) {
        next(error);
    }


}

module.exports = {handleLogin,handleLogout};