
function addContact(){
    $(".user-add-new-contact").bind("click",function (){
        //Lấy data id của user người dùng từ thẻ html của thuộc tính data
        let targetID = $(this).data("uid");
        //Gửi một request đến server với data là uid, data là dữ liệu sau khi xử lý được
        $.post("/contact/add-new", {uid: targetID},function(data) {
            //Kiểm tra biến success từ server gửi lên, nếu đúng thì thực hiện ẩn đi
            if(data.success)
            {
                //Tìm đến thẻ add-user có data là id muốn kết bạn
                //ẩn nút kết bạn
                $("#find-user").find(`div.user-add-new-contact[data-uid = ${targetID}]`).hide();
                //hiển thị nút hủy yêu cầu
                $("#find-user").find(`div.user-remove-request-contact[data-uid = ${targetID}]`).css("display","inline-block");
                increaseNumberRequestContact("count-request-contact-sent");
                socket.emit("add-new-contact",{contactId: targetID});
            }     
        });
    })
}