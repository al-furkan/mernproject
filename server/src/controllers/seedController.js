const User = require("../models/userModel");
const product = require("../models/productModel");
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


const seedProducts = async (req, res, next) =>{
    try{
        
        //deleting all exisiting product
       
         await product.deleteMany({});

        // insart all exisiting Product
      const products = await product.insertMany(data.products);

       //successful response
       return res.status(201).json(products);
    //    console.log("hello");
    }catch(error) {
        console.log("error ")
       next(error);
    }
};

module.exports = { seedUser,seedProducts}