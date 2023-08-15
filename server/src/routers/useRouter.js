const express = require("express");
const { getUsers, getUser, deleteUser, processRagister, activateUserAccound, UserUpdatebyid, HandelbanduserByid, UnHandelbanduserByid, UpdatepasswordByid, ForgetpasswordByid, ResetpasswordByid } = require("../controllers/userControllers");
const upload = require("../middlewared/uploadfile");
const { validateuserRegistration, validateuserUpdatepassword, validateuserForgetpassword, validateuserResetpassword } = require("../validators/auth");
const { runValidation } = require("../validators");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewared/auth");
const useRouter = express.Router();

useRouter.post('/process-register', upload.single('image'),isLoggedOut, validateuserRegistration,runValidation,processRagister);
useRouter.post('/verify',isLoggedOut,activateUserAccound);
useRouter.get('/',isLoggedIn,isAdmin, getUsers);
useRouter.get('/:id',isLoggedIn, getUser);
useRouter.delete('/:id',isLoggedIn,deleteUser);
useRouter.put('/reset-password/',validateuserResetpassword,runValidation,ResetpasswordByid);
useRouter.put('/:id',upload.single('image'),isLoggedIn,UserUpdatebyid);
useRouter.put('/ban-user/:id',isLoggedIn,isAdmin,HandelbanduserByid);
useRouter.put('/unban-user/:id',isLoggedIn,isAdmin,UnHandelbanduserByid);
useRouter.put('/update-password/:id',isLoggedIn,validateuserUpdatepassword,runValidation,UpdatepasswordByid);
useRouter.post('/forget-password/',validateuserForgetpassword,runValidation,ForgetpasswordByid);


module.exports = useRouter;