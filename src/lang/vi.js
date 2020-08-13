let messageError = {
    email: "Email phải có định dạng example@gmail.com !",
    gender: "Giới tính phải chọn Nam hoặc Nữ !",
    password: "Mật khẩu phải chứa ít nhất 8 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt !",
    confirmPassword: "Mật khẩu không trùng khớp"
}
let transError ={
    duplicationEmail:(email)=> `Tài khoản <strong>${email}</strong> đã được đăng ký, vui lòng đăng ký email khác`,
    deletedAcc:(email)=> `Tài khoản <strong>${email}</strong> đã bị vô hiệu hóa, vui lòng liên hệ Admin để lấy lại tài khoản`,
    activeAcc:(email) => `Tài khoản này đã được đăng ký nhưng chưa active tài khoản, vui lòng vào email <strong>${email}</strong> để active tài khoản của bạn.`
}
let transSuccess = {
    registerSuccess: (email) => {
        return `Tài khoản <strong>${email}</strong> được đăng ký thành công, vui lòng kiểm tra Email trước khi đăng nhập.`
    }
}
export const messErr = messageError;
export const transErr = transError;
export const transSucc = transSuccess;
