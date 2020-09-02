let messageError = {
    email: "Email phải có định dạng example@gmail.com !",
    gender: "Giới tính phải chọn Nam hoặc Nữ !",
    password: "Mật khẩu phải chứa ít nhất 8 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
    confirmPassword: "Mật khẩu không trùng khớp",
    usernameUpdate: "Username giới hạn từ 1-30 ký tự và không chứa kí tự đặc biệt",
    genderUpdate: "Bạn là hacker chăng ? Sao lại đi đổi giới tính vậy !",
    addressUpdate:"Địa chỉ từ 3-30 ký tự",
    phoneUpdate:"Số điện thoại phải bắt đầu bằng số 0 và giới hạn 10-11 chữ số",
    currenPassword:"Mật khẩu cũ phải chứa ít nhất 8 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
    newPassword:"Mật khẩu mới phải chứa ít nhất 8 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
}
let transError ={
    duplicationEmail:(email)=> `Tài khoản <strong>${email}</strong> đã được đăng ký, vui lòng đăng ký email khác`,
    deletedAcc:(email)=> `Tài khoản <strong>${email}</strong> đã bị vô hiệu hóa, vui lòng liên hệ Admin để lấy lại tài khoản`,
    activeAcc:(email) => `Tài khoản này đã được đăng ký nhưng chưa active tài khoản, vui lòng vào email <strong>${email}</strong> để active tài khoản của bạn.`,
    isToken:'Token không tồn tại !',
    loginFail:'Tài khoản hoặc mật khẩu không đúng.',
    loginActiveAcc:"Tài khoản chưa được active, vui lòng kiểm tra email và active tài khoản.",
    serverLogin: "Hệ thống đăng nhập xảy ra lỗi, vui lòng đăng nhập lại.",
    typeAvatarType: "Kiểu file không hợp lệ, chỉ chấp nhận các file *.jpg, *.jepg, *.png",
    sizeAvatarType: "Ảnh upload tối đa là 2 MB",
    userInvalue:"Tài khoản người dùng không tồn tại trên hệ thống",
    wrongPassword: "Mật khẩu hiện tại không chính xác",
    keywordFindUser:"Lỗi từ khóa tìm kiếm",
}
let transSuccess = {
    registerSuccess: (email) => {
        return `Tài khoản <strong>${email}</strong> được đăng ký thành công, vui lòng kiểm tra Email trước khi đăng nhập.`
    },
    activeSuccess: 'Tài khoản được kích hoạt thành công, vui lòng đăng nhập để sử dụng dịch vụ',
    loginSuccess: "Đăng nhập tài khoản thành công.",
    logoutSucess:"Đăng xuất tài khoản thành công. Hẹn gặp lại bạn nhé !",
    updateUser:"Cập nhật tài khoản thành công !",
    updatePassword: "Cập nhật mật khẩu thành công",
}
let transEmail = {
    subject : '"Lu Communication" Xác thực tài khoản đăng ký',
    content : (link)=>{
        return `<h2>Chào mừng bạn đã đến với Lu Communication!</h2>
                <h3>Cảm ơn bạn đã tạo tài khoản để tham gia hệ thống trò truyện trực tuyến Lu Communication</h3>
                <h3>Click vào link phía bên dưới để kích hoạt tài khoản trên hệ thống <strong>Lu Communication</strong></h3>
                <h3><a href="${link}" target="blank">${link}</a></h3>`
    },
    sendFail: "Quá trình gửi email xảy ra lỗi, vui lòng tiến hành đăng kí lại tài khoản"
}
export const messErr = messageError;
export const transErr = transError;
export const transSucc = transSuccess;
export const transMail = transEmail;
