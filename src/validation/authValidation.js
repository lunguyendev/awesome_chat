import {check} from "express-validator/check";
import {messErr} from "./../lang/vi";

let checkRegister = [
    check("email", messErr.email)
        .isEmail()
        .trim(),
    check("gender", messErr.gender)
        .isIn(["male","female"]),
    check("password", messErr.password)
        .isLength({min:8})
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("password_confirmation",messErr.confirmPassword)
        .custom((value,{req})=>{
            return value === req.body.password;
        })
];
module.exports = {
    checkRegister: checkRegister
}
