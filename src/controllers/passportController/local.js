import passport from "passport";
import passportLocal from "passport-local"
import userModel from "./../../models/userModel";
import {transErr,transSucc} from "./../../lang/vi";
let LocalStretagy = passportLocal.Strategy;

//Hàm xử lý các giá trị trong đăng nhập
let initPassportLocal = ()=>{
    //Tạo một LocalStretagy
    passport.use(new LocalStretagy({
        usernameField : "email",
        passwordField : "password",
        passReqToCallback :true 
    },async(req,username,password,done)=>{
        //Tìm email trong db 
        let user = await userModel.findByEmail(username);
         try {
             //Kiểm tra email có tồn tại hay không
            if(!user)
                //Nếu khống trả về lỗi và đẩy lên req.flash để hiển thị lỗi cho client
                return done(null,false,req.flash("errors",transErr.loginFail));
            
            //Kiểm tra email đã active hay chưa
            if(!user.local.isActive)
                return done(null,false,req.flash("errors",transErr.loginActiveAcc));
            
            //So sánh password trong db
            let comparePass = await user.comparePass(password);
            //Kiểm tra password có đúng hay không
            if(!comparePass)
                return done(null,false,req.flash("errors",transErr.loginFail));
                
            //Trả về giá trị user để lưu vào session và gửi thông báo đăng nhập thành công
            return done(null,user,transSucc.loginSuccess);
         } catch (error) {
             console.log(error);
             return done(null,false,req.flash("errors",transErr.serverLogin));
         }
    }))
    //Lưu biến user_id vào req.passport.user.userId
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    })
    //Lưu biến user và req.user
    passport.deserializeUser((userId,done)=>{
        userModel.findUserById(userId)
        .then(user =>{
            return done(null,user)
        })
        .catch(err => {
            return done(err,null)
        })
    })
} 
module.exports = initPassportLocal;
