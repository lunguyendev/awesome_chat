import multer from "multer";
import {app} from "./../config/app"
import {transErr,transSucc} from "./../lang/vi"
import {v4 as uuidv4}  from 'uuid';
import {user} from "./../services/index";
import fsExtra from "fs-extra";
import {validationResult} from 'express-validator/check';

//Khai báo nơi upload ảnh lên trên ứng dụng của mình
let storeAvatar = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,app.avatar_directory);
    },
    filename : (req,file,callback)=>{
        //Kiểm tra định dạng file có hợp lệ hay không
        let math = app.avatar_type;
        if(math.indexOf(file.mimetype) === -1)
        {
            return callback(transErr.typeAvatarType,null);
        }
        //Đặt lại tên ảnh.
        let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
        callback(null,avatarName);
    }
})

let avatarUploadFile = multer({
    storage: storeAvatar,
    limits:{fileSize: app.avater_limit_size}
}).single("avatar")//Trùng tên với bên formData khi request lên

//Controller update avatar
let userUpdateAvatar = (req,res)=>{
    avatarUploadFile(req,res,async(err)=>{
        if(err){
            if(err.message){
                return res.status(500).send(transErr.sizeAvatarType);
            }
            return res.status(500).send(err);
        }
        try {
            //Update lại trường
            let userUpdateItem = {
                avatar:req.file.filename,
                updateAt: Date.now(),
            }
            let userUpdate = await user.updateUser(req.user._id,userUpdateItem);
            //Xóa link file trong thư viện ảnh của người dùng
            await fsExtra.remove(`${app.avatar_directory}/${userUpdate.avatar}`);
            //Trả về kết quả cho người dùng
            let result = {
                message:transSucc.updateUser,
                imgSrc: `images/users/${req.file.filename}`,
            }
            return res.status(200).send(result)

        } catch (error) {
            return res.status(500).send(error);
        }
    })
}

//Controller Update User Information
let userUpdateInfo = async(req,res)=>{
    //Kiểm tra validation của form đăng ký
    let valid = validationResult(req);
    let arrErr= []; //Create arrray to contain err
    //Kiểm tra xem có tồn tại lỗi sau khi kiểm tra validation hay không
    if(!valid.isEmpty())
    {   
        //Đẩy tất cả các lỗi vào mảng Error
        valid.array().forEach(item =>{
            arrErr.push(item.msg);
        })
        //Lưu mảng lỗi vào flash để đẩy lên phía client
        return res.status(500).send(arrErr);
    }
    
    try {
        let userUpdateItem = req.body ;
        let userUpdate = await user.updateUser(req.user._id,userUpdateItem);

        let result = {
            message:transSucc.updateUser,
            user: userUpdateItem
        }
        return res.status(200).send(result)

    } catch (error) {
        return res.status(500).send(error);
    }
}
module.exports = {
    userUpdateAvatar : userUpdateAvatar,
    userUpdateInfo: userUpdateInfo
}
