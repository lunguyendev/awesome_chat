let userAvatar = null;
let userInfo = {};

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
    })
    //Gắn biến gender vào object userInfo khi click chuột vào radio
    $("#input-change-gender-male").bind("click",function (){
        userInfo.gender = $(this).val();
    })
    //Gắn biến gender vào object userInfo khi click chuột vào radio
    $("#input-change-gender-female").bind("click",function (){
        userInfo.gender = $(this).val();
    })
    //Gắn biến address vào object userInfo khi thay đổi nội dung textbox
    $("#input-change-address").bind("change",function (){
        userInfo.address = $(this).val();
    })
    //Gắn biến phone vào object userInfo khi thay đổi nội dung textbox
    $("#input-change-phone").bind("change",function (){
        userInfo.phone = $(this).val();
    })
}

function clickSave(){
    $("#input-btn-update-user").bind("click",function(){
        if($.isEmptyObject(userInfo) && userAvatar === null)
        {
             alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu","error",7);
             return false;
        }
        $.ajax({
            type: "put",
            url: "/user/update-avatar",
            data: userAvatar,
            success: function (response) {
                //
            },
            error: function (error){
                 //
            }
        });
     })
}

function clickReset(){
    //Lấy url của hình ảnh ban đầu khi chưa cập nhật
    let originAvatarSrc= $("#user-modal-avatar").attr("src");
    $("#input-btn-reset-update-user").bind("click",function(){
        userAvatar=null;
        $("#user-modal-avatar").attr("src",originAvatarSrc);
        userInfo={};
    })
}
$(document).ready(function () {
    //Hàm xử lý khi update dữ liệu
    updateUserInfo();
    
    //Xử lý khi nhấn nút Lưu lại
    clickSave();

    //Xử lý khi nhấn nút Hủy bỏ
    clickReset();
});