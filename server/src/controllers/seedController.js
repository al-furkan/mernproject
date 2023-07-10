const User = require("../models/userModel");
const testUser = require("../models/testmodel");
const data = require("../data");
const createUser = async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
  
      // Create a new user instance
      const newUser = new testUser({
        name,
        email,
        password,
        phone,
        address
      });
  
      // Save the user to the database
      const createdUser = await newUser.save();
  
      res.status(201).json({
        status: 'success',
        user: createdUser
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to create user',
        error: error.message
      });
    }
}


const seedUser = async (req, res, next) =>{
    try{
        console.log(data.users);
        const users = await User.insertMany(data.users);
        res.status(200).json({
            status: "success",
            users,
        });
    //     //deleting all exisiting users
       
    //     await User.deleteMany({});

    //     // insart all exisiting users
    //    const users = await User.insertMany(data.users);

    //    //successful response
    //    return res.status(201).json(users);
    //    console.log("hello");
    }catch(error) {
        console.log("error ")
       next(error);
    }
};


module.exports = { seedUser, createUser }