//Tăng số lượng yêu cầu kết bạn khi thêm bạn mới
function increaseNumberRequestContact(className){
    let currentRequest = +$(`.${className}`).find("em").text();
    currentRequest+=1;
    if(currentRequest == 0){
        $(`.${className}`).html("");
    }else{
        $(`.${className}`).html(`(<em>${currentRequest}</em>)`);
    }
}
//Hủy số lượng yêu cầu kết bạn khi hủy bỏ yêu cầu
function decreaseNumberRequestContact(className){
    //Tìm số người kêt bạn hiện tại
    let currentRequest = +$(`.${className}`).find("em").text();
    currentRequest -= 1;
    if(currentRequest == 0){
        $(`.${className}`).html("");
    }else{
        $(`.${className}`).html(`(<em>${currentRequest}</em>)`);
    }
}
