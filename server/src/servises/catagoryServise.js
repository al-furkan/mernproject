var slugify = require('slugify');

const Catagori = require('../models/catagoriModel');

const catagoriServise = async(name)=>{
    
        const newcatagory = await Catagori.create({
            name:name,
            slug:slugify(name)
        })
    
         return newcatagory;
    }

const getcatagories = async()=>{
    
    return await Catagori.find({}).select('name slug').lean();
    }

const getcatagory = async(slug)=>{
    
    return await Catagori.find({slug}).select('name slug').lean();
    }

    const catagoriUpdate = async(slug, name)=>{
      const flagi = {slug};
      const update = {$set:{name:name,slug:slugify(name)}};
      const option = {new:true};
        const catagoriUpdate = await Catagori.findOneAndUpdate(
            flagi,update,option
        )
    
         return catagoriUpdate;
    }


    const catagoryDelete = async(slug, )=>{
          const catagoridelete = await Catagori.findOneAndDelete({slug});
      
           return catagoridelete;
      }
  

module.exports ={
    catagoriServise,
    getcatagories,
    getcatagory,
    catagoriUpdate,
    catagoryDelete
}