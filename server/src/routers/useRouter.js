const express = require("express");
const { getUsers, getUser, deleteUser, processRagister } = require("../controllers/userControllers");
const useRouter = express.Router();

useRouter.post('/process-register',processRagister);
useRouter.get('/',getUsers);
useRouter.get('/:id',getUser);
useRouter.delete('/:id',deleteUser);

module.exports = useRouter;