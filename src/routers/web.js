import express from 'express';
import {auth,home,user,contact} from './../controllers/index';
import {authValid,userValid,contactValid} from "./../validation/index";
import initPassportLocal from './../controllers/passportController/local';
import initPassportFB from './../controllers/passportController/facebook';
import initPassportGG from './../controllers/passportController/google';
import passport from "passport";

initPassportLocal();
initPassportFB();
initPassportGG();

let router = express.Router();
let webRouter = (app)=>{
    app.use("/",router);
    //Router truy cập homepage
    router.get("/",auth.checkLoggedIn,home.getHome);
    //Router để đăng xuất tài khoản
    router.get("/logout",auth.checkLoggedIn,auth.getLogout)
    //Router để login vào hệ thống 
    router.get("/login",auth.checkLoggedOut,auth.getLogin);
    //Router để gửi form đăng ký lên hệ thống
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
    //Router đăng nhập facebook
    router.get("/auth/facebook",auth.checkLoggedOut,passport.authenticate("facebook",{scope:["email"]}));
    //Router chuyển hướng khi đăng nhập facebook
    router.get("/auth/facebook/callback",auth.checkLoggedOut,passport.authenticate("facebook",{
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    //Routerđăng nhập bằng google
    router.get("/auth/google",auth.checkLoggedOut,passport.authenticate("google",{scope:["email"]}));
    //Router chuyển hướng khi đăng nhập bằng google
    router.get("/auth/google/callback",auth.checkLoggedOut,passport.authenticate("google",{
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    //Router cập nhật avatar người dùng
    router.put("/user/update-avatar",auth.checkLoggedIn,user.userUpdateAvatar);
    //Router cập nhật thông tin người dùng
    router.put("/user/update-info",auth.checkLoggedIn,userValid.checkUserUpdate,user.userUpdateInfo);
    //Roupet cập nhật mật khẩu
    router.put("/user/update-password",auth.checkLoggedIn,userValid.checkPassword,user.userUpdatePassword);
    //Route tìm kiếm người dùng
    router.get("/contact/find-users/:keyword",auth.checkLoggedIn,contactValid.checkFindContact,contact.findUsersContact);
}
module.exports = webRouter;
