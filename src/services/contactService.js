import ContactModel from "./../models/contactModel";
import UserModel from "./../models/userModel";
import _ from "lodash";
import { user } from ".";
const { resolve, reject } = require("bluebird")


let findUsersContact = (currentUserId,keyword)=>{
    return new Promise(async(resolve,reject)=>{
        //Lập bảng ra tìm những user id mà bạn đã kết bạn rồi
        let deprecatedUserIds = [currentUserId];
        //Tìm kiếm những id đã kết bạn với mình rồi
        let arrUserID = await ContactModel.findAllByUser(currentUserId);
        //Lọc ra những id ở trên đẩy vào một mảng
        arrUserID.forEach(element => {
            deprecatedUserIds.push(element.userId);
            deprecatedUserIds.push(element.contactId);
        });
        //Xóa những id trùng trong mảng dùng thư viện lodash để lọc ra và xóa
        deprecatedUserIds = _.uniqBy(deprecatedUserIds);
        //Tìm những id chưa tồn tại trong mảng deprecatedUserIds và có username, email có trùng từ khóa ở keyword
        let users = await UserModel.findAllForAddContact(deprecatedUserIds,keyword);
        let userArr = [];
        //Lưu những user đó vào mảng
        users.forEach(element => {
            userArr.push(element._doc);
        });
        resolve(userArr)
    })  
}

let addFriend = (currentUserId,contactID)=>{
    return new Promise(async(resolve,reject)=>{
        //Kiểm tra xem đã tồn tại những userId của mình đã kết bạn chưa
        let contactExists = await ContactModel.checkExists(currentUserId,contactID);
        if(contactExists){
            return reject(false);
        }
        //Nếu chưa thì tạo bản ghi kết bạn trong contact
        let newContactItem = {
            "userId" : currentUserId,
            "contactId": contactID,
        }
        //Thêm bản ghi vào contact
        let newContact = await ContactModel.createItem(newContactItem);
        resolve(newContact)
    })  
}
let removeRequestContact = (currentUserId,contactID)=>{
    return new Promise(async(resolve,reject)=>{
        //Kiểm tra xem đã tồn tại những userId của mình đã kết bạn chưa
        let removeRequest = await ContactModel.removeRequestContact(currentUserId,contactID);
        if(removeRequest.result.n === 0)
        {
            return reject(false);
        }
        return resolve(true);
    })  
}



module.exports = {
    findUsersContact : findUsersContact,
    addFriend: addFriend,
    removeRequestContact:removeRequestContact
}
