import {validationResult} from 'express-validator/check';
import {auth} from './../services/index';

let getLogin = (req,res)=>{
    return res.render('auth/master',{
        //Gửi 2 biến lên để thông báo trong alert
        errors: req.flash("errors"),
        success:req.flash("success")
    });
}
let postRegister = async(req,res)=>{
    //Kiểm tra validation của form đăng ký
    let valid = validationResult(req);
    let arrErr= []; //Create arrray to contain err
    let arrSucc=[]; //Create array để chứa thông báo thành công
    //Kiểm tra xem có tồn tại lỗi sau khi kiểm tra validation hay không
    if(!valid.isEmpty())
    {   
        //Đẩy tất cả các lỗi vào mảng Error
        valid.array().forEach(item =>{
            arrErr.push(item.msg);
        })
        //Lưu mảng lỗi vào flash để đẩy lên phía client
        req.flash("errors", arrErr);
        return res.redirect("login");
    }
    try {
        //Nếu không lỗi thì xử lý lưu vào database
        let regisSuccess = await auth.authService(req.body.email,req.body.gender,req.body.password);
        //Đẩy thông báo thành công vào mảng
        arrSucc.push(regisSuccess);
        //Lưu mảng thành công vào flash để đẩy lên phía client
        req.flash('success',arrSucc);
        res.redirect('login');
    } catch (error) {
        //Đẩy tất cả các lỗi trong quá trình lưu vào database
        arrErr.push(error);
        req.flash("errors",arrErr);
        res.redirect('login');
    }
}
module.exports = {
    getLogin : getLogin,
    postRegister:postRegister
}
