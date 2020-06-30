// var express = require('express');
import express from "express";
let app = express();

let hostname = "localhost";
let port = 3000;

app.get("/hello",(req,res)=>{
    res.send("Hello");
});

app.listen(port,hostname,()=>{
    console.log("App running at localhost:3000");
});

