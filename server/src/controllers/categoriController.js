var slugify = require('slugify');
const { successResponse } = require("./responseController");
const Catagori = require('../models/catagoriModel');
const { catagoriServise, getcatagories,getcatagory,catagoriUpdate, catagoryDelete } = require('../servises/catagoryServise');
const createError = require('http-errors');

const handleCreatCatagory = async(req , res, next)=>{
    try{

        const { name } = req.body;
        const newcatagory = await catagoriServise(name);
        
        return successResponse(res, {
            statusCode: 201,
            message: 'Creat catagories successfully',
            payload:{newcatagory}
        });
    }
    
       catch(error){
        next(error);
       }
}

const handlegetCatagoris = async(req , res, next)=>{
    try{

        const catagories  = await getcatagories();
        return successResponse(res, {
            statusCode: 200,
            message: ' catagories  get successfully',
            payload:{catagories}
        });
    }
    
       catch(error){
        next(error);
       }
}


const handlegetCatagory = async(req , res, next)=>{
    try{
        const { slug } = req.params;
        const catagory  = await getcatagory(slug);
        return successResponse(res, {
            statusCode: 200,
            message: ' catagories  get successfully',
            payload:{catagory}
        });
    }
    
       catch(error){
        next(error);
       }
}

const handleUpdateCatagory = async(req , res, next)=>{
    try{

        const { name } = req.body;
        const { slug } = req.params;
        const updateCatagory = await catagoriUpdate(slug,name);
        if(!updateCatagory){
            throw createError(404,"catagory did not Found");
        }
        return successResponse(res, {
            statusCode: 200,
            message: 'Update catagories successfully',
            payload:{updateCatagory}
        });
    }
    
       catch(error){
        next(error);
       }
}


const handleDeleteCatagory = async(req , res, next)=>{
    try{
        const { slug } = req.params;
        const catagoryDelet = await catagoryDelete(slug);
        if(!catagoryDelet){
            throw createError(404,"catagory did not Found");
        }
        return successResponse(res, {
            statusCode: 200,
            message: 'Deleta catagories successfully',
        });
    }
    
       catch(error){
        next(error);
       }
}




module.exports ={
    handleCreatCatagory,
    handlegetCatagoris,
    handlegetCatagory,
    handleUpdateCatagory,
    handleDeleteCatagory
}