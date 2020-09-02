import {check} from "express-validator/check";
import {transErr} from "./../lang/vi";

//Kiểm tra đầu vào của ô tìm kiếm
let checkFindContact = [
    check("keyword", transErr.keywordFindUser)
        .isLength({min:1,max:17})
        .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),

];
module.exports = {
    checkFindContact: checkFindContact
}

