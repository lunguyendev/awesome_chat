// var express = require('express');
import express from "express";
import ConnecDB from "./config/connectDB";
import dotenv  from "dotenv";
import configViewEngine from "./config/viewEngine";
import Router from "./routers/web";
import bodyParser from "body-parser";
import flash from "connect-flash";
import configSession from "./config/session";

let app = express();
dotenv.config();
app.use(bodyParser.urlencoded({extended:true}));
//Connect to Mongo
ConnecDB();
//Config view Engine
configViewEngine(app);
//use connect-flash
app.use(flash());
//use Session
configSession(app);

Router(app);

let hostname = "localhost";
let port = 3000;

app.listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
    console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`);
});
