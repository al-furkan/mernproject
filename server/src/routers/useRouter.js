const express = require("express");
const { getUsers, getUser } = require("../controllers/userControllers");
const useRouter = express.Router();


useRouter.get('/',getUsers);
useRouter.get('/:id',getUser);


module.exports = useRouter;