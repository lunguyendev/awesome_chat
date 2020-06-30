var express = require('express');

var app = express();

var hostname = "localhost";
var port = 3000;

app.get("/hello",(req,res)=>{
    res.send("Hello");
});

app.listen(port,host,()=>{
    console.log("App running at localhost:3000");
});

