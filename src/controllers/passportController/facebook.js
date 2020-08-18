import passport from "passport";
import passportFB from "passport-facebook"
import userModel from "./../../models/userModel";
import {transErr,transSucc} from "./../../lang/vi";
import dotenv from "dotenv";

dotenv.config();

let FBStrategy = passportFB.Strategy;
let fbAppId = process.env.FB_APP_ID;
let fbAppSecret = process.env.FB_APP_SECRET;
let fbAppUrl = process.env.FB_CALLBACK_URL;

//Hàm xử lý các giá trị trong đăng nhập
let initPassportFB = ()=>{
    //Tạo một LocalStretagy
    passport.use(new FBStrategy({
        clientID: fbAppId,
        clientSecret: fbAppSecret,
        callbackURL: fbAppUrl,
        passReqToCallback :true,
        profileFields: ["email","gender","displayName"]
    },async(req,accessToken,refreshToken,profile,done)=>{
        //Tìm email fb trong db 
        try {
            let user = await userModel.findByFacebookUid(profile.id);
             //Kiểm tra email fb có tồn tại hay không
            if(user)
                //Nếu khống trả về lỗi và đẩy lên req.flash để hiển thị lỗi cho client
                return done(null,user,transSucc.loginSuccess);
            else{
                //Tạo một user mới 
                let newUserItem = {
                    username: profile.displayName,
                    gender: profile.gender,
                    local:{
                        isActive: true,
                    },
                    facebook:{
                        uid:profile.id,
                        token:accessToken,
                        email: profile.emails[0].value,
                    }
                }
                //Lưu user mới vào db
                let creatUser = await userModel.createItem(newUserItem);
                return done(null,creatUser,transSucc.loginSuccess);
            }
         } catch (error) {
            //  console.log(error);
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
module.exports = initPassportFB;
