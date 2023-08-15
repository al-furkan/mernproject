const express = require("express");
const { seedUser } = require("../controllers/seedController");
const upload = require("../middlewared/uploadfile");
const seedRouter = express.Router();


seedRouter.post("/users",upload.single('image'),seedUser);



module.exports = seedRouter;