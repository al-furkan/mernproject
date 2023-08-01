const express = require("express");
const { getUsers, getUser, deleteUser, processRagister, activateUserAccound } = require("../controllers/userControllers");
const useRouter = express.Router();

useRouter.post('/process-register',processRagister);
useRouter.post('/verify',activateUserAccound);
useRouter.get('/',getUsers);
useRouter.get('/:id',getUser);
useRouter.delete('/:id',deleteUser);

module.exports = useRouter;