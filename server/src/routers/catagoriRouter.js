const express = require("express");
const { runValidation } = require("../validators");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewared/auth");
const { handleCreatCatagory, handlegetCatagory, handlegetCatagoris, handleUpdateCatagory, handleDeleteCatagory } = require("../controllers/categoriController");
const { validatCatagori } = require("../validators/catagori");
const catagoriRouter = express.Router();



catagoriRouter.post('/',validatCatagori,runValidation,handleCreatCatagory);
catagoriRouter.get('/',handlegetCatagoris);
catagoriRouter.get('/:slug',handlegetCatagory);
catagoriRouter.put('/:slug',validatCatagori,runValidation,handleUpdateCatagory);
catagoriRouter.delete('/:slug',handleDeleteCatagory);



module.exports = catagoriRouter;