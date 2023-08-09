const express = require("express");
const { getUsers, getUser, deleteUser, processRagister, activateUserAccound, UserUpdatebyid } = require("../controllers/userControllers");
const upload = require("../middlewared/uploadfile");
const { validateuserRegistration } = require("../validators/auth");
const { runValidation } = require("../validators");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewared/auth");
const useRouter = express.Router();

useRouter.post('/process-register', upload.single('image'),isLoggedOut, validateuserRegistration,runValidation,processRagister);
useRouter.post('/verify',isLoggedOut,activateUserAccound);
useRouter.get('/',isLoggedIn,isAdmin, getUsers);
useRouter.get('/:id',isLoggedIn, getUser);
useRouter.delete('/:id',isLoggedIn,deleteUser);
useRouter.put('/:id',upload.single('image'),isLoggedIn,UserUpdatebyid);

module.exports = useRouter;