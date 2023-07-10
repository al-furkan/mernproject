const express = require("express");
const morgan = require("morgan");
const bodyParser  = require("body-parser");
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const useRouter = require("./routers/useRouter");
const seedRouter = require("./routers/seedrouter");
const { errorResponse } = require("./controllers/responseController");


const app  = express();

const rateLimiter = rateLimit({
    windowMs: 1*60*1000,
    max: 5,
    message: 'Too many requests from this IP. please try again later',
})

app.use(rateLimiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/user',useRouter);
app.use('/api/seed',seedRouter);

//client error handling 
app.use((req,res,next)=>{
    next(createError(404, 'route not found'));
});

//server error handling ->all the errors
app.use((err,req,res,next)=>{
    return errorResponse(res,{
       statusCode: err.status,
        message: err.message,

    });
});



module.exports = app;