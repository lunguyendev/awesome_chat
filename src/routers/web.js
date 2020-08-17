import express from 'express';
import {auth,home} from './../controllers/index';
import {authValid} from "./../validation/index";
import initPassportLocal from './../controllers/passportController/local';
import passport from "passport";

initPassportLocal();
let router = express.Router();
let webRouter = (app)=>{
    app.use("/",router);
    //Router truy cập homepage
    router.get("/",auth.checkLoggedIn,home.getHome);
    //Router để đăng xuất tài khoản
    router.get("/logout",auth.checkLoggedIn,auth.getLogout)
    //Router để login vào hệ thống 
    router.get("/login",auth.checkLoggedOut,auth.getLogin);
    //Router để gửi form đăng ký lên hệ thốngs
    router.post("/register",auth.checkLoggedOut,authValid.checkRegister,auth.postRegister);
    //Router để kích hoạt tài khoản qua email
    router.get("/verify/:token",auth.checkLoggedOut,auth.activeAccount);
   //Router để đăng nhập vào hệ thống
    router.post("/login",passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }))
    
}
module.exports = webRouter;
