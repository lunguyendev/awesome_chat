//Controller của Router vào homepage
let getHome = (req,res)=>{
    return res.render('main/home/main',{
      //Gửi 2 biến lên để thông báo trong alert
      errors: req.flash("errors"),
      success:req.flash("success")
  });
 };
 module.exports = {
    getHome : getHome
 }
