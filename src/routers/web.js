import express from 'express';
import {auth,home} from './../controllers/index';
import {authValid} from "./../validation/index"

let router = express.Router();

let webRouter = (app)=>{
    app.use("/",router);
    //Router truy cập homepage
    router.get("/",home.getHome);
    //Router để login vào hệ thống 
    router.get("/login",auth.getLogin);
    //Router để gửi form đăng ký lên hệ thống
    router.post("/register",authValid.checkRegister,auth.postRegister);
    //Router để kích hoạt tài khoản qua email
    router.get("/verify/:token",auth.activeAccount);
   
}
module.exports = webRouter;
