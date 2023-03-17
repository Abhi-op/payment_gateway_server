require ('dotenv').config({path : './config/.env'});


//Importing required module
const express = require('express');
const app= express();
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("./config/database")

//Importing payment routes
const paymentRoutes = require("./routes/payment.routes");
//Port
const port= process.env.PORT||4000;

app.listen(port,()=>console.log(`server is running on port ${port}`));

//using middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({credentials:true}));
app.use(bodyParser.json());
app.use("/invoice",paymentRoutes);



//error handling
//catching 404 and forwarding to error handler

       app.use((req,res,next)=>{
        next(createError(404));
        })
      
       app.use((err,req,res,next)=>{
        res.locals.message= err.message;
        res.locals.error=req.app.get('env')==='development'?err:{};
      
        //rendering error page
        res.status(err.status || 500);
        res.send("Error");
      })

     module.exports= app;