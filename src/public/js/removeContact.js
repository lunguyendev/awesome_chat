
function removeRequestContact(){
    $(".user-remove-request-contact").bind("click",function (){
        //Lấy data id của user người dùng từ thẻ html của thuộc tính data
        let targetID = $(this).data("uid");
        //Gửi một request đến server với data là uid, data là dữ liệu sau khi xử lý được
        $.ajax({
            type: "delete",
            url: "/contact/remove-request-contact",
            data: {uid:targetID},
            success: function (data) {
                if(data.success)
                {
                    //Tìm đến thẻ add-user có data là id muốn kết bạn
                    //ẩn nút hủy yêu cầu
                    $("#find-user").find(`div.user-remove-request-contact[data-uid = ${targetID}]`).hide();
                    //hiển thị nút kết bạn
                    $("#find-user").find(`div.user-add-new-contact[data-uid = ${targetID}]`).css("display","inline-block");
                    //Trừ 1 khi hủy kết bạn
                    decreaseNumberRequestContact("count-request-contact-sent");
                }
            }
        });
        
    })
}
