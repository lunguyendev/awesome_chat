import {validationResult} from 'express-validator/check';
import {auth} from './../services/index';
import { transSucc } from '../lang/vi';

//Controller của Router Đăng nhập tài khoản
let getLogin = (req,res)=>{
    return res.render('auth/master',{
        //Gửi 2 biến lên để thông báo trong alert
        errors: req.flash("errors"),
        success:req.flash("success")
    });
}

//Controller của Router gửi form Đăng ký tài khoản
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
        let regisSuccess = await auth.authService(req.body.email,req.body.gender,req.body.password,req.protocol,req.get('host'));
        //Đẩy thông báo thành công vào mảng
        arrSucc.push(regisSuccess);
        //Lưu mảng thành công vào flash để đẩy lên phía client
        req.flash('success',arrSucc);
        res.redirect('login');
    } catch (error) {
        //Đẩy tất cả các lỗi trong quá trình lưu vào database
        arrErr.push(error);
        req.flash("errors",arrErr);
        res.redirect('/login');
    }
}

//Controller của router active tài khoản ở trên mail
let activeAccount = async(req,res)=>{
    let arrErr= []; //Create arrray to contain err
    let arrSucc=[]; //Create array để chứa thông báo thành công
    try {
        //Lấy thông báo từ database, nếu không lỗi sẽ có thông báo success
        let activeSucc = await auth.activeAccount(req.params.token)
        arrSucc.push(activeSucc);
        //Lưu mảng thành công vào flash để đẩy lên phía client
        req.flash('success',arrSucc);
        res.redirect('/login');
    } catch (error) {
        arrErr.push(error);
        req.flash("errors",arrErr);
        res.redirect('/login');
    }
   
}

//Controller của router đăng xuất
let getLogout = (req,res)=>{
    req.logout();
    req.flash("success",transSucc.logoutSucess)
    res.redirect("/login")
}
//Kiểm tra xem đã Login hay chưa
let checkLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated())
        return res.redirect("/login");
    next();
}
//Kiểm tra xem đã logout hay chưa
let checkLoggedOut = (req,res,next)=>{
    if(req.isAuthenticated())
        return res.redirect("/");
    next();
}

module.exports = {
    getLogin : getLogin,
    postRegister:postRegister,
    activeAccount:activeAccount,
    getLogout:getLogout,
    checkLoggedIn:checkLoggedIn,
    checkLoggedOut:checkLoggedOut
}
