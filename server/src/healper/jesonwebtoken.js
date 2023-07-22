var jwt = require('jsonwebtoken');

const createJsonWebToken = (payload, expiresIn,secretKey ) =>{

  if(typeof payload!= 'object'|| !payload){
      throw new Error ('paylod must be  a non-empty object'); 
  }
  if(typeof secretKey!= 'string'|| secretKey=== ''){
    throw new Error ('secret key must be a non-empty'); 
}
try{
    var token = jwt.sign( payload, secretKey, {expiresIn});
    return token;
}catch(error){
    console.error('faild to sign the jwt:',error);
    throw error;
}
};
 module.exports = { createJsonWebToken };


