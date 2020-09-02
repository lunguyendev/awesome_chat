function callFindUsers(element){
    //Số 13 tức là key code của phím enter, khi gõ xong nhấn phím enter hoặc là phần tử đó mới nhận thực hiện click chuôt
    if(element.which === 13 || element.type === "click"){
        let keyword = $("#input-find-users-contact").val();
        let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);
        //Nếu chưa nhập gì
        if(!keyword.length)
        {
            alertify.notify("Chưa nhập nội dung tìm kiếm","error",7)
            return false;
        }
        //Nếu nhập không đúng địng dạng
        if(!regexUsername.test(keyword)){
            alertify.notify("Lỗi từ khóa tìm kiếm","error",7)
            return false;
        }
        //Nhập đúng yêu cầu, gửi request tìm kiếm
        $.get(`/contact/find-users/${keyword}`, function(data){
            $('#find-user ul').html(data)
        })
    }
}

$(document).ready(function () {
    $("#input-find-users-contact").bind("keypress", callFindUsers);
    $("#btn-find-users-contact").bind("click", callFindUsers);
});
