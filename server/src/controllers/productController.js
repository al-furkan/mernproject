const createError = require('http-errors');
var slugify = require('slugify');
const { successResponse } = require('./responseController');
const {  findWithId } = require('../servises/finditem');
const { deleteImage } = require('../healper/deleteUser');
const express = require('express');
const Product = require('../models/productModel');
const { creatProductservice } = require('../servises/productService');
//const Catagori = require('../models/catagoriModel');

const createProduct = async(req , res, next)=>{
    try{

        const { name ,description ,price ,quantity ,shipping,catagory} = req.body;
        const image = req.file;

        if(!image){
            throw createError(400, 'Image file is required');
        }
        if(image.size>1024*1024*2){
            throw new Error('Image file is to learge');
        }

        const imageBufferString = image.buffer.toString('base64');
        const productData = {name ,description ,price ,quantity ,shipping,catagory,imageBufferString};
        const product = await creatProductservice(productData);


        return successResponse(res, {
            statusCode: 200,
            message: 'product create successfully',
            payload: { product },
        });
    }
    
       catch(error){
        next(error);
       }
}

const getProduct = async(req , res, next)=>{
    try{
         const page=parseInt(req.query.page)||1;
         const limit=parseInt(req.query.limit)||6;
         const search = req.query.search || "";
     
          const searchregExp = new RegExp('.*' + search + ".*",'i');
     
          const filter = {
             isAdmin: {$ne: true},
             $or:[  
                 {name:{$regex: searchregExp}},
             ]
            };
        const products = await Product.find({}).populate('catagory')
        .skip((page-1)*limit).limit(limit).sort({createAt:-1});

        if(!products){
            throw createError(404,"Product did not found");
        }

        const cound = await Product.find({}).countDocuments();

        return successResponse(res, {
            statusCode: 200,
            message: 'products get successfully',
            payload: { products:products,
                pagination:{
                    totalpage:Math.ceil(cound/limit),
                    currentpage:page,
                    previouspage:page-1,
                    nextpage:page+1,
                    totalnumberofProduct: cound,
                }
             },
        });
    }
    
       catch(error){
        next(error);
       }
}


const getsingleProduct = async(req , res, next)=>{
    try{
         const {slug}= req.params;

        const products = await Product.findOne({slug}).populate('catagory');
;

        if(!products){
            throw createError(404,"Product did not found");
        }


        return successResponse(res, {
            statusCode: 200,
            message: 'product one get successfully',
            payload: {products },
        });
    }
    
       catch(error){
        next(error);
       }
}

const deleteProduct = async(req , res, next)=>{
    try{
         const {slug}= req.params;

        const products = await Product.findOneAndDelete({slug});
;

        if(!products){
            throw createError(404,"Product did not found");
        }


        return successResponse(res, {
            statusCode: 200,
            message: 'product delet successfully',
            payload: {products },
        });
    }
    
       catch(error){
        next(error);
       }
}

const updateProduct = async(req , res, next)=>{
    try{
    const {slug} = req.params;
    const updateoptions ={ 
           new:true,
           runValidation: true,
           context:'query',
       };

    let updates={};

    const allawedField =['name','description' ,'price' ,'quantity' ,'shipping'];

   for(let key in req.body){
       if(allawedField.includes(key)){
           updates[key]=req.body[key];
       }
   }
   if(updates.name){
    updates.slug=slugify(updates.name);
   }

   const image = req.file;

   if(image){
       if(image.size>1024*1024*2){
           throw createError(400,'Image file is to learge. It must be less then 2MB');
       }
       updates.image = image.buffer.toString('base64');
   }
      
   console.log("hello");

   const updateproduct =await Product.findOneAndUpdate({slug},updates,updateoptions);
    
    if(!updateproduct){
       throw createError(404,'Product  did not  updeat exist')
    }


       return successResponse(res, {
           statusCode: 200,
           message: 'Productwas Update successfully',
           payload: updateproduct,
       });
   }
   
      catch(error){
       next(error);
      }
}

module.exports = {
    createProduct,
    getProduct,
    getsingleProduct,
    deleteProduct,
    updateProduct,
 };