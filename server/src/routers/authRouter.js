const express = require("express");
const { runValidation } = require("../validators");
const { handleLogin, handleLogout } = require("../controllers/authContoller");
const { isLoggedOut, isLoggedIn } = require("../middlewared/auth");
const { validateuserLogin } = require("../validators/auth");
const authRouter = express.Router();

authRouter.post("/login",validateuserLogin,runValidation,isLoggedOut,handleLogin);
authRouter.post("/logout",isLoggedIn, handleLogout);

module.exports = authRouter;
