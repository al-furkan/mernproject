var slugify = require('slugify');
const Product = require('../models/productModel');
const createError = require('http-errors');

const creatProductservice= async (productData)=>{
     
    const{name ,description ,price ,quantity ,shipping,catagory, imageBufferString} = productData;
    const productExists = await Product.exists({name: name})
        
    if(productExists){
        throw createError(409, 'Product already exists.  please Another Product name');
    }
     
    //create product
   const product = await Product.create({
    name:name, 
    slug:slugify(name),
    description:description , 
    price:price , 
    quantity:quantity , 
    shipping:shipping,
    image:imageBufferString,
    catagory:catagory,
});

return product;
}



module.exports ={
    creatProductservice,

};