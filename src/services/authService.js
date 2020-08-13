import userModel from './../models/userModel';
import bcrypt from 'bcrypt';
import {v4 as uuidv4}  from 'uuid';
import { resolve, reject } from 'bluebird';
import {transErr} from '../lang/vi';
import {transSucc} from '../lang/vi'

/**
 * Module này dùng để lưu tài khoản vào Database
 */
let saltRound = 7;
let authService = (email, gender, password) =>{
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
        //Trả về thông báo đăng ký thành công cho người dùng
        return resolve(transSucc.registerSuccess(createUser.local.email))
    }) 
};
module.exports = {
    authService: authService
};
