const createError = require('http-errors');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const { createJsonWebToken } = require('../healper/jesonwebtoken');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const { jwtaccesskey, jwtRefreshkey } = require('../secret');



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
        jwtaccesskey,'2m');
     
        res.cookie('accessToken',accessToken,{
            maxAge:2*60*1000,
            httpOnly:true,
            secure: true,
            sameSite:'none'
        })
         // token, cooking
         //create jwt
       const refreshToken= createJsonWebToken({user},
        jwtRefreshkey,'7d');
     
        res.cookie('refreshToken',refreshToken,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            secure: true,
            sameSite:'none'
        })
        const userwithout = await  user.toObject();
        delete userwithout.password;
       //success response
       return successResponse(res,{
        statusCode:200,
        message:'user Login successfully',
        payload:{userwithout}
       })
    } catch (error) {
        next(error);
    }


}

const handleLogout= async(req, res, next)=>{

    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        
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

//refarse token
const handlerefressToken= async(req, res, next)=>{

    try {
  
        const oldReferceToken=req.body.refreshToken;

        //varify refresh token
         const decodedToken = jwt.verify(oldReferceToken,jwtRefreshkey);
         if(!decodedToken){
            throw createError(404, "invalid refresh token .Please login Again");
         }


        // token, cooking
         //create jwt
         const accessToken= createJsonWebToken(decodedToken.user,
            jwtaccesskey,'2m');
         
            res.cookie('accessToken',accessToken,{
                maxAge:2*60*1000,
                httpOnly:true,
                secure: true,
                sameSite:'none'
            })


       //success response
       return successResponse(res,{
        statusCode:200,
        message:'new acccess token is generated',
        payload:{}
       })
    } catch (error) {
        next(error);
    }


}

//refarse token
const handleProtect= async(req, res, next)=>{

    try {
  
        const accessToken=req.body.accessToken;

        //varify refresh token
         const decodedToken = jwt.verify(accessToken,jwtaccesskey);
         if(!decodedToken){
            throw createError(404, "invalid Access token .Please login Again");
         }


        // token, cooking
         //create jwt
            res.cookie('accessToken',accessToken,{
                maxAge:2*60*1000,
                httpOnly:true,
                secure: true,
                sameSite:'none'
            })


       //success response
       return successResponse(res,{
        statusCode:200,
        message:'Access token valide successfully',
        payload:{}
       })
    } catch (error) {
        next(error);
    }


}

module.exports = {handleLogin,handleLogout,handlerefressToken,handleProtect};