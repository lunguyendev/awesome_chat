import userModel from './../models/userModel';
import bcrypt from 'bcrypt';
import {v4 as uuidv4}  from 'uuid';
import { resolve, reject } from 'bluebird';
import {transErr,transSucc,transMail} from '../lang/vi';
import sendEmail from '../config/mail'

/**
 * Module này dùng để lưu tài khoản vào Database
 */
let saltRound = 7;
let authService = (email, gender, password,protocol,host) =>{
    return new Promise(async(resolve,reject)=>{
        //tìm xem email đã tồn tại trong db hay chưa.
        let checkEmail = await userModel.findByEmail(email);
        //kiem tra xem có trùng Email hay không
        if(checkEmail)
        {
            if(checkEmail.deleteAt != null)
                return reject(transErr.deletedAcc(email));
            if(!checkEmail.local.isActive)
                return reject(transErr.activeAcc(email));
            return reject(transErr.duplicationEmail(email));
            
        } 
        //Tạo muối xử lý password
        let salt = bcrypt.genSaltSync(saltRound);
        let userItem = {
            //cắt email chỉ lấy phần tên của email
            username : email.split('@')[0],
            gender: gender,
            local: {
                email: email,
                password: bcrypt.hashSync(password,salt),
                veryfyToken: uuidv4()
            }
        };
        //Lưu tài khoản vào db
        let createUser = await userModel.createItem(userItem);
        //Tạo link trong email để xác nhận tài khoản
        let linkVerify=`${protocol}://${host}/verify/${createUser.local.veryfyToken}`
        
        //Gửi mail xác thực tài khoản cho người dùng (EmailUser,Subject,Content)
        sendEmail(email, transMail.subject, transMail.content(linkVerify))
        .then(success =>{
            //Trả về thông báo đăng ký thành công cho người dùng
            resolve(transSucc.registerSuccess(createUser.local.email))
        })
        .catch(err=>{
            console.log(err);
            return reject(transMail.sendFail);
        })
    }) 
};
//Truyền vào token để lấy dữ liệu từ trong db ra và sửa lại active = true và xóa đi token
let activeAccount = (token)=>{
    return new Promise(async (resolve, reject)=>{
        let isToken = await userModel.findToken(token);
        //Kiểm tra token có tồn tại hay không, nếu không thì thông báo là không tồn tại token
        if(!isToken)
            //thông báo error
            return reject(transErr.isToken);
        //Fix db: active = true và delete token
        await userModel.activeAccount(token);
        resolve(transSucc.activeSuccess);
    }) 
}
module.exports = {
    authService: authService,
    activeAccount:activeAccount
};
