import userModel from "./../models/userModel";

let updateUser = (id,file)=>{
    return userModel.updateUserInfo(id,file);
} 

module.exports = {
    updateUser : updateUser
}