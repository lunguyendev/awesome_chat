import mongoose from "mongoose";

let Schema = mongoose.Schema;
//Tạo Schema của user
let UserSchema = new Schema(
    {
        username : String,
        gender : {type : String, default : "male"},
        phone: {type : Number, default : null},
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
    }
}
module.exports = mongoose.model("user", UserSchema);