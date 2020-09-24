import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;
//Tạo Schema của user
let UserSchema = new Schema(
    {
        username : String,
        gender : {type : String, default : "male"},
        phone: {type : String, default : null},
        address: {type : String, default : null},
        avatar: {type : String, default : "avatar-default.jpg"},
        role: {type : String, default : "user"},
        local : {
            email: {type: String, trim:true},
            password: String,
            isActive : {type: Boolean, default: false},
            veryfyToken: String
        },
        facebook:{
            uid: String,
            token: String,
            email: {type: String, trim: true}
        },
        google:{
            uid: String,
            token: String,
            email: {type: String, trim: true}
        },
        createAt: {type: Number, default: Date.now},
        updateAt: {type: Number, default: null},
        deleteAt: {type: Number, default: null}
    }
)

UserSchema.statics = {
    //Tìm user bằng id
    findUserById(id){
        return this.findById(id).exec();
    },
    //Lưu user vào db
    createItem(item){
        return this.create(item);
    },
    //Tìm email trong db
    findByEmail(email){
        return this.findOne({'local.email':email}).exec();
    },
    //Xóa đi user bằng id
    removeUser(id){
        return this.findByIdAndRemove(id).exec();
    },
    //Tìm user có token và sửa lại active = true và xóa token
    activeAccount(token){
        return this.findOneAndUpdate({
            "local.veryfyToken": token
        },
        {
            "local.veryfyToken": null,
            "local.isActive": true,
        }).exec();
    },
    //Tìm token trong db có tồn tại không
    findToken(token){
        return this.findOne({"local.veryfyToken": token})
    },
    //Tìm userId bằng Fb trong db
    findByFacebookUid(uid){
        return this.findOne({'facebook.uid':uid}).exec();
    },
    //Tìm userId bằng email google
    findByGoogleUid(uid){
        return this.findOne({'google.uid':uid}).exec();
    },
    //Cập nhật thông tin người dùng theo id
    updateUserInfo(id,file)
    {
        return this.findByIdAndUpdate(id,file).exec();
    },
    //Cập nhật password theo id
    updatePassword(id,hashedPassword){
        return this.findByIdAndUpdate(id,{"local.password":hashedPassword}).exec();
    },
    //Tìm kiếm tất cả các người dùng có chưa key word và loại bỏ những id trong bảng deprecateUserIds
    findAllForAddContact(deprecatedUserIds,keyword){
        return this.find({
            $and:[
                {"_id": {$nin: deprecatedUserIds}},
                {"local.isActive":true},
                {$or: [
                    {"username":{"$regex": new RegExp(keyword,"i") }},
                    {"local.email":{"$regex":new RegExp(keyword,"i") }},
                    {"facebook.email":{"$regex":new RegExp(keyword,"i") }},
                    {"google.email":{"$regex":new RegExp(keyword,"i") }},
                ]}
            ]
        },{_id: 1, username: 1, address: 1, avatar: 1}).exec();
    }
    
}
UserSchema.methods = {
    //Lấy password ra để so sánh
    comparePass(password){
        return bcrypt.compare(password,this.local.password);
    }
}
module.exports = mongoose.model("user", UserSchema);
