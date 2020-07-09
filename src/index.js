// var express = require('express');
import express from "express";
import ConnecDB from "./config/connectDB"
import ContactModdel from "./models/contact.model"
import dotenv  from "dotenv";
import configViewEngine from "./config/viewEngine";
import Router from "./routers/web"

let app = express();
dotenv.config();
//Connect to Mongo
ConnecDB();
//Config view Engine
configViewEngine(app);

Router(app);

let hostname = "localhost";
let port = 3000;

app.listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
    console.log(`App running at ${process.env.APP_HOST}:${process.env.APPe_PORT}`);
});
