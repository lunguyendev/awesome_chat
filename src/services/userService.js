import userModel from "./../models/userModel";
import {transErr} from "./../lang/vi"
import { resolve, reject } from "bluebird";
import bcrypt from 'bcrypt';

//Tạo muối
const saltRounds = 7;

//Tìm userid để update info
let updateUser = (id,file)=>{
    return userModel.updateUserInfo(id,file);
} 


//Tìm userID để update mật khẩu
let updatePassword = (id,item)=>{
    return new Promise(async(resolve,reject)=>{
        let currentUser = await userModel.findUserById(id);
        //Kiểm tra userID có tồn tại hay không
        if(!currentUser)
            return reject(transErr.userInvalue);
        //So sánh mật khẩu cũ trong db
        let checkCurrentPassword = await currentUser.comparePass(item. currentPassword);
        //Kiểm tra có đúng hay không
        if(!checkCurrentPassword)
            return reject(transErr.wrongPassword);
        //Thiết lập muối cho mã băm
        let salt = bcrypt.genSaltSync(saltRounds)
        //Hash mật khẩu rồi lưu vào database
        await userModel.updatePassword(id,bcrypt.hashSync(item.newPassword,salt));
        resolve(true);
    })
}

module.exports = {
    updateUser : updateUser,
    updatePassword: updatePassword
}
