const express = require("express");
const upload = require("../middlewared/uploadfile");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewared/auth");
const { createProduct, getProduct, getsingleProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const { validatProduct } = require("../validators/product");
const { runValidation } = require("../validators");
const productRouter = express.Router();

productRouter.post('/', upload.single('image'),validatProduct,runValidation,createProduct);
productRouter.get('/',getProduct);
productRouter.get('/:slug',getsingleProduct);
productRouter.delete('/:slug',deleteProduct);
productRouter.put('/:slug', upload.single('image'),validatProduct,runValidation,updateProduct);

module.exports = productRouter;