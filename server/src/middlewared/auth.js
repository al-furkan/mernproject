const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { jwtaccesskey } = require('../secret');


const isLoggedIn = async (req,res,next) =>{
    try {
        const token = req.cookies.accessToken;
       if(!token){
        throw createError(401,'access token did not find');
       }
  const decoded = jwt.verify(token,jwtaccesskey);
  if(!decoded){
    throw createError(401,'access token did not find.please login');
   }
   req.user= decoder.user;
      next();  
    } catch (error) {
        return next(error);
    }
} 



const isLoggedOut = async (req,res,next) =>{
    try {
        const token = req.cookies.accessToken;
       if(!token){
        throw createError(400,'user is already login');
       }
        next();
        
    } catch (error) {
        return next(error);
    }
} 

const isAdmin = async (req,res,next) =>{
    try {
        if(!req.user.isAdmin){
            throw createError(403,'Forbidden, you must be an admin');
           }
     
        next();
        
    } catch (error) {
        return next(error);
    }
} 



module.exports = {isLoggedIn,isLoggedOut,isAdmin};