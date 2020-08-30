import {check} from "express-validator/check";
import {messErr} from "../lang/vi";

let checkUserUpdate = [
    check("username", messErr.usernameUpdate)
        .optional()
        .isLength({min:3, max:30})
        .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
    check("gender", messErr.genderUpdate)
        .optional()
        .isIn(["male","female"]),
    check("address", messErr.addressUpdate)
        .optional()
        .isLength({min:3, max:30}),
    check("phone",messErr.phoneUpdate)
        .optional()
        .isLength({min:10,max:11})
        .matches(/^(0)[0-9]{9,10}$/)
];

let checkPassword = [
    check('currentPassword',messErr.currenPassword)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check('newPassword',messErr.newPassword)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check('confirmPassword',messErr.confirmPassword)
        .custom((value,{req}) => value === req.body.newPassword)
]

module.exports = {
    checkUserUpdate: checkUserUpdate,
    checkPassword:checkPassword
}

