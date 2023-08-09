const express = require("express");
const { runValidation } = require("../validators");
const { handleLogin, handleLogout } = require("../controllers/authContoller");
const { isLoggedOut, isLoggedIn } = require("../middlewared/auth");
const authRouter = express.Router();

authRouter.post("/login",isLoggedOut, handleLogin);
authRouter.post("/logout",isLoggedIn, handleLogout);





module.exports = authRouter;