import express from 'express';
import {auth,home} from './../controllers/index';

let router = express.Router();

let webRouter = (app)=>{
    router.get("/",home.homeController);
     
     router.get("/login",auth.loginController);

    app.use("/",router);
}
module.exports = webRouter;
