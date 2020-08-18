import passport from "passport";
import passportGG from "passport-google-oauth"
import userModel from "./../../models/userModel";
import {transErr,transSucc} from "./../../lang/vi";
import dotenv from "dotenv";

dotenv.config();

let GGStrategy = passportGG.OAuth2Strategy
let ggAppId = process.env.GG_APP_ID;
let ggAppSecret = process.env.GG_APP_SECRET;
let ggAppUrl = process.env.GG_CALLBACK_URL;

//Hàm xử lý các giá trị trong đăng nhập
let initPassportGG = ()=>{
    //Tạo một GoogleStretagy
    passport.use(new GGStrategy({
        clientID: ggAppId,
        clientSecret: ggAppSecret,
        callbackURL: ggAppUrl,
        passReqToCallback :true,
    },async(req,accessToken,refreshToken,profile,done)=>{
        //Tìm email của google trong db 
        let user = await userModel.findByGoogleUid(profile.id);
         try {
             //Kiểm tra email có tồn tại hay không
            if(user)
                //Gửi thông báo đăng nhập thành công
                return done(null,user,transSucc.loginSuccess);
            else{
                //Nếu không có tạo một user mới trong db
                let newUserItem = {
                    username: profile.displayName,
                    gender: profile.gender,
                    local:{
                        isActive: true,
                    },
                    google:{
                        uid:profile.id,
                        token:accessToken,
                        email: profile.emails[0].value,
                    }
                }
                //Tạo user mới trong db
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
module.exports = initPassportGG;
