import {contact, user} from "./../services/index";
import {validationResult} from 'express-validator/check';
let findUsersContact = async(req,res)=>{
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
    //Thường thì ở đây sẽ luuw lỗi vào file log để admin có thể fix
    try {
        //Lấy username của mình từ request
        let currentUserId = req.user._id;
        //Lấy từ khóa tìm kiếm từ params của url
        let keyword = req.params.keyword;
        //Tìm kiếm, cái này gọi dữ liệu từ service vì service làm việc với db
        let users = await contact.findUsersContact(currentUserId,keyword);
        // let userArr = [];
        //Gửi file này lên data của client
        return res.render("main/contacts/sections/_fileUserContact",{users});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
let addFriend = async(req,res)=>{
    
    try {
        //Lấy id của mình từ request
        let currentUserId = req.user._id;
        //Lấy id của người mình muốn kết bạn ở phía client gửi xuống
        let contactId = req.body.uid;
        //Lưu vào db Contact khi kết bạn
        let newContact = await contact.addFriend(currentUserId,contactId);
        // console.log(newContact);
        // console.log(!!newContact);// Kiểm tra có tồn tại hay không, trả về true hoặc false
        //Trả kết quả ngược lên client thông qua biến success
        return res.status(200).send({"success":!!newContact})
        // return res.render("main/contacts/sections/_fileUserContact",{users});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
let removeRequestContact = async(req,res)=>{
    
    try {
        //Lấy id của mình từ request
        let currentUserId = req.user._id;
        //Lấy id của người mình muốn kết bạn ở phía client gửi xuống
        let contactId = req.body.uid;
        //Lưu vào db Contact khi kết bạn
        let removeRequest = await contact.removeRequestContact(currentUserId,contactId);
        // console.log(removeRequest);
        // console.log(!!removeRequest);// Kiểm tra có tồn tại hay không, trả về true hoặc false
        //Trả kết quả ngược lên client thông qua biến success
        return res.status(200).send({"success":!!removeRequest})
        // return res.render("main/contacts/sections/_fileUserContact",{users});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports = {
    findUsersContact : findUsersContact,
    addFriend: addFriend,
    removeRequestContact:removeRequestContact
}

