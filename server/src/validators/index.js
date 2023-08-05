const {validationResult} = require("express-validator");


const runValidation =async (req,res,next) =>{
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){

    }
    
  } catch (error) {
    return next(error)
  }


}