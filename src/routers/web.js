import express from 'express';
import {auth,home} from './../controllers/index';
import {authValid} from "./../validation/index"

let router = express.Router();

let webRouter = (app)=>{
    router.get("/",home.getHome);
     
    router.get("/login",auth.getLogin);
    router.post("/register",authValid.checkRegister,auth.postRegister);

    app.use("/",router);
}
module.exports = webRouter;
