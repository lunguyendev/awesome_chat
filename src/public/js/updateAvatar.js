let userAvatar = null;
let userInfo = {};
let originAvatarSrc=null;
let originUserInfo={};

function updateUserInfo(){
    //Xử lý sự kiện khi thay đổi avatar
    $("#input-change-avatar").bind("change", function () {
        //Lấy về đối tượng filedata
        let fileData = $(this).prop("files")[0];
        //Khởi tạo biến để so sánh định dạng file
        let match = ["image/jpg","image/png","image/jpeg"];
        //Khởi tạo biến để so sánh dung lượng của file
        let limit = 1048576*2; // 1 MB = 1048576 bybe

        //So sánh xem định dạng file có nằm trong mảng file quy định sẵn hay không
        if($.inArray(fileData.type,match) === -1)
        {
            //Xuất ra thông báo cho người dùng
            alertify.notify("Kiểu file không hợp lệ, chỉ chấp nhận các file *.jpg, *.jepg, *.png","error",7);
            //Set giá trị file về mặc định
            $(this).val(null);
            return false;
        } 
        //So sánh xem dung lượng file có lớn hơn 2MB hay không 
        if(fileData.size >limit){
            //Xuất ra thông báo cho người dùng.
            alertify.notify("Ảnh upload tối đa là 2 MB","error",7);
            //Set giá trị file về mặc địng 
            $(this).val(null);
            return false;
        }
        //lấy thẻ hình ảnh về
        let imgPreview = $("#image-edit-profile");
        //Làm rỗng html trong thẻ
        imgPreview.empty();

        //Khởi tạo biến đọc file
        let fileReader = new FileReader();

        //Khi file đọc khởi tạo một thẻ img và đưa vào trong thẻ hình ảnh imgPreview
        fileReader.onload = function(element){
            $("<img>",{
                "src": element.target.result,
                "class": "avatar img-circle",
                "id": "user-modal-avatar",
                "alt": "avatar"
            }).appendTo(imgPreview);
        }

        //Hiển thị thẻ hình ảnh lên
        imgPreview.show();
        
        //Đọc file hình ảnh bằng url
        fileReader.readAsDataURL(fileData);
        
        //Khởi tạo form data để lưu file hình ảnh vào
        let formData = new FormData();
        formData.append('avatar',fileData);
        userAvatar =formData;  
    });
    //Gắn biến username vào object userInfo khi thay đổi nội dung textbox
    $("#input-change-username").bind("change",function (){
        userInfo.username = $(this).val();
        let regexUsername = new RegExp("^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$");
        if(!regexUsername.test(userInfo.username) || userInfo.username.length < 3 || userInfo.username.length >30)
        {
            alertify.notify("Username giới hạn từ 1-30 ký tự và không chứa kí tự đặc biệt","error",7)
            $(this).val(originUserInfo.username);
            delete userInfo.username;
            return false;
        }
    })
    //Gắn biến gender vào object userInfo khi click chuột vào radio
    $("#input-change-gender-male").bind("click",function (){
        userInfo.gender = $(this).val();
        if(userInfo.gender != "male")
        {
            alertify.notify("Bạn là hacker chăng ? Sao lại đi đổi giới tính vậy !","error",7)
            $(this).val(originUserInfo.gender);
            delete userInfo.gender;
            return false;
        }

    })
    //Gắn biến gender vào object userInfo khi click chuột vào radio
    $("#input-change-gender-female").bind("click",function (){
        userInfo.gender = $(this).val();
        if(userInfo.gender != "female")
        {
            alertify.notify("Bạn là hacker chăng ? Sao lại đi đổi giới tính vậy !","error",7)
            $(this).val(originUserInfo.gender);
            delete userInfo.gender;
            return false;
        }
    })
    //Gắn biến address vào object userInfo khi thay đổi nội dung textbox
    $("#input-change-address").bind("change",function (){
        userInfo.address = $(this).val();
        if(userInfo.address.length < 3 || userInfo.address.length >30)
        {
            alertify.notify("Địa chỉ từ 3-30 ký tự","error",7)
            $(this).val(originUserInfo.address);
            delete userInfo.address;
            return false;
        }
    })
    //Gắn biến phone vào object userInfo khi thay đổi nội dung textbox
    $("#input-change-phone").bind("change",function (){
        userInfo.phone = $(this).val();
        let regexPhone = new RegExp("^(0)[0-9]{9,10}$");
        if(!regexPhone.test(userInfo.phone) || userInfo.phone.length < 10 || userInfo.phone.length >11)
        {
            alertify.notify("Số điện thoại phải bắt đầu bằng số 0 và giới hạn 10-11 chữ số","error",7)
            $(this).val(originUserInfo.phone);
            delete userInfo.phone;
            return false;
        }
    })
}

function requestAvatar(){
    $.ajax({
        type: "put",
        url: "/user/update-avatar",
        data: userAvatar,
        cache:false,
        contentType: false,
        processData: false,
        success: function (response) {
            $(".user-modal-alert-success").css("display","none");
            $(".user-modal-alert-success").find("span").text(response.message);
            $(".user-modal-alert-success").css("display","block");

            //cập nhật ảnh đại diện nhỏ
            $("#navbar-avt").attr("src",response.imgSrc);
            

            //Cập nhật ảnh đại diện ở phần chỉnh sửa
            $("#user-modal-avatar").attr("src",response.imgSrc);
            $("#input-change-avatar").val(null);
            originAvatarSrc = response.imgSrc;

                //Reset lại mọi thứ.
                $("#input-btn-reset-update-user").click();
        
        },
        error: function (error){
                $(".user-modal-alert-error").find("span").text(error.responseText);
                $(".user-modal-alert-error").css("display","block")

                //Reset lại mọi thứ.
                $("#input-btn-reset-update-user").click();
        }
    });
}
function requestInfo(){
    
    $.ajax({
        type: "put",
        url: "/user/update-info",
        data: userInfo,
        success: function (response) {
            $(".user-modal-alert-success").find("span").text(response.message);
            $(".user-modal-alert-success").css("display","block");

            //cập nhật username
            $("#navbar-username").text(userInfo.username);
            //Reset lại mọi thứ.
            originUserInfo = Object.assign(originUserInfo,userInfo);
            $("#input-btn-reset-update-user").click();
                
        
        },
        error: function (error){
                $(".user-modal-alert-error").find("span").text(error.responseText);
                $(".user-modal-alert-error").css("display","block")

                //Reset lại mọi thứ.
                $("#input-btn-reset-update-user").click();
        }
    });
     
}

function clickSave(){
    $("#input-btn-update-user").bind("click",function(){
        if($.isEmptyObject(userInfo) && userAvatar === null)
        {
             alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu","error",7);
             return false;
        }
        if(userAvatar){
            requestAvatar()
        }
        if(!$.isEmptyObject(userInfo)){
            requestInfo();
        }
    })
}

function getInfoUser(){
    originUserInfo.username = $("#input-change-username").val();
    originUserInfo.gender = ($("#input-change-gender-male").is(":checked") ? $("#input-change-gender-male").val() : $("#input-change-gender-female").val())
    originUserInfo.address = $("#input-change-address").val();
    originUserInfo.phone = $("#input-change-phone").val();
}


function clickReset(){
    //Lấy url của hình ảnh ban đầu khi chưa cập nhật
    originAvatarSrc= $("#user-modal-avatar").attr("src");
    $("#input-btn-reset-update-user").bind("click",function(){
        $("#user-modal-avatar").attr("src",originAvatarSrc);
        $("#input-change-avatar").val(null);
        $("#input-change-username").val(originUserInfo.username);
        (originUserInfo.gender==="male" ? $("#input-change-gender-male").click() : $("#input-change-gender-female").click())
        $("#input-change-address").val(originUserInfo.address);
        $("#input-change-phone").val(originUserInfo.phone);
        userAvatar=null;
        userInfo = {};
    })
}
$(document).ready(function () {
    //Hàm lấy dữ diệu User để sau này reset
    getInfoUser();
    //Hàm xử lý khi update dữ liệu
    updateUserInfo();
    
    //Xử lý khi nhấn nút Lưu lại
    clickSave();

    //Xử lý khi nhấn nút Hủy bỏ
    clickReset();
});
