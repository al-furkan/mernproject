const createHttpError = require("http-errors");
const  mongoose  = require("mongoose");
const User = require("../models/userModel");

const findWithId = async (id, options = {}) => {
try{
    const options = {password: 0};
    const item = await User.findById(id, options);

        if (!item){
            throw createHttpError(404, 'item does not exist with this id');
        }
        return item;
   }catch(error){
    if(error instanceof mongoose.Error){
        throw (createError(404, "Invalid item Id"));
    }
     throw error;
   }
}

module. exports = { findWithId };