const express = require("express");
const { getUsers, getUser, deleteUser, processRagister, activateUserAccound } = require("../controllers/userControllers");
const upload = require("../middlewared/uploadfile");
const useRouter = express.Router();

useRouter.post('/process-register',upload.single('image'),processRagister);
useRouter.post('/verify',activateUserAccound);
useRouter.get('/',getUsers);
useRouter.get('/:id',getUser);
useRouter.delete('/:id',deleteUser);

module.exports = useRouter;