import {validationResult} from 'express-validator/check';

let getLogin = (req,res)=>{
    return res.render('auth/master');
}
let postRegister = (req,res)=>{
    let valid = validationResult(req);
    let arrErr= []; //Create arrray to contain err
    if(!valid.isEmpty())
    {
        valid.array().forEach(item =>{
            arrErr.push(item.msg);
        })
        console.log(arrErr);
        return;
    }
    console.log(req.body);
}
module.exports = {
    getLogin : getLogin,
    postRegister:postRegister
}
