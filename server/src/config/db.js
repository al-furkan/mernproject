const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");
const connectDatabase = async (options) =>{
    try{
        await mongoose.connect(mongodbURL, options);
        console.log('connect to DB is Successfully established');

        mongoose.connection.on('error',(error)=>{
            console.error('dbconnection error:',error);
        })

    }catch(error){
        console.error('could not connect to DB :',error.toString());
      
    }
}

module.exports = connectDatabase;