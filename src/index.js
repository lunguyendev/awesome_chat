// var express = require('express');
import express from "express";
import ConnecDB from "./config/connectDB";
import dotenv  from "dotenv";
import configViewEngine from "./config/viewEngine";
import Router from "./routers/web";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "./config/session";
import passport from "passport";
import https from "https";
import fs from "fs"
import http from 'http'
import socketio from 'socket.io';
import initSocket from './sockets/index';
import cookieParser from 'cookie-parser';
import configSessionSocket from './config/socketio'

//Init App
let app = express();
//Init server with socket io & express
let server = http.createServer(app);
let io = socketio(server);

dotenv.config();
app.use(bodyParser.urlencoded({extended:true}));
//Connect to Mongo
ConnecDB();
//Config view Engine
configViewEngine(app);
//use connect-flash
app.use(flash());
//use cookie-parse
app.use(cookieParser())

//use Session
session.config(app);


//Cài đặt passport để xác thực tài khoản, gồm hàm khởi tạo và hàm session
app.use(passport.initialize());
app.use(passport.session());

//Sửa dụng Router
Router(app);

//Config session socket 
configSessionSocket(io,cookieParser,session.sessionStore);

//Sử dụng Socket
initSocket(io);


server.listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
      console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`);
  });
  
  // // This line is from the Node.js HTTPS documentation.
  // const options = {
  //     key: fs.readFileSync('key.pem'),
  //     cert: fs.readFileSync('cert.pem')
  //   };
  
// Create an HTTP service.
// http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
//         console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`);
// });





