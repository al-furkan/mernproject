const express = require("express");
const { seedUser, createUser } = require("../controllers/seedController");
const seedRouter = express.Router();


seedRouter.post("/users",seedUser);

seedRouter.post("/test",createUser);


module.exports = seedRouter;