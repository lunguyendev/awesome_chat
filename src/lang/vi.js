let messageError = {
    email: "Email phải có định dạng example@gmail.com !",
    gender: "Giới tính phải chọn Nam hoặc Nữ !",
    password: "Mật khẩu phải chứa ít nhất 8 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt !",
    confirmPassword: "Mật khẩu không trùng khớp"
}
let transError ={
    duplicationEmail:(email)=> `Tài khoản <strong>${email}</strong> đã được đăng ký, vui lòng đăng ký email khác`,
    deletedAcc:(email)=> `Tài khoản <strong>${email}</strong> đã bị vô hiệu hóa, vui lòng liên hệ Admin để lấy lại tài khoản`,
    activeAcc:(email) => `Tài khoản này đã được đăng ký nhưng chưa active tài khoản, vui lòng vào email <strong>${email}</strong> để active tài khoản của bạn.`,
    isToken:'Token không tồn tại !'
}
let transSuccess = {
    registerSuccess: (email) => {
        return `Tài khoản <strong>${email}</strong> được đăng ký thành công, vui lòng kiểm tra Email trước khi đăng nhập.`
    },
    activeSuccess: 'Tài khoản được kích hoạt thành công, vui lòng đăng nhập để sử dụng dịch vụ'
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
