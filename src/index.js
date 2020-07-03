// var express = require('express');
import express from "express";
import ConnecDB from "./config/connectDB"
import ContactModdel from "./models/contact.model"
import dotenv  from "dotenv";


let app = express();
dotenv.config();
//Connect to Mongo
ConnecDB();

let hostname = "localhost";
let port = 3000;

app.get("/testdb",async (req,res)=>{
    try {
        let item = {
            userId : "121231",
            contactId: "14546",
        };
        let contact = await ContactModdel.createItem(item);
        res.send(contact);
    } catch (error) {
        console.log(error);
    }
});

app.listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
    console.log(`App running at ${process.env.APP_PORT}:${process.env.APP_PORT}`);
});
