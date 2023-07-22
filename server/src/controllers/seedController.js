const User = require("../models/userModel");
const data = require("../data");


const seedUser = async (req, res, next) =>{
    try{
        
        //deleting all exisiting users
       
         await User.deleteMany({});

        // insart all exisiting users
      const users = await User.insertMany(data.users);

       //successful response
       return res.status(201).json(users);
    //    console.log("hello");
    }catch(error) {
        console.log("error ")
       next(error);
    }
};


module.exports = { seedUser }