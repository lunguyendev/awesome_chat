// var express = require('express');
import express from "express";
import ConnecDB from "./config/connectDB"
import ContactModdel from "./models/contact.model"
import dotenv  from "dotenv";
import configViewEngine from "./config/viewEngine";

let app = express();
dotenv.config();
//Connect to Mongo
ConnecDB();
//Config view Engine
configViewEngine(app);

let hostname = "localhost";
let port = 3000;

app.get("/", (req,res)=>{
   return res.render('main/master');
});
app.get("/login",(req,res)=>{
    return res.render('auth/loginRegister');
})
app.listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
    console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`);
});
