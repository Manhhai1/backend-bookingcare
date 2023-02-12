require('dotenv').config()
const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
let sentEmail = async (dataSend) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Mạnh Hải 👻" <vomanhhai230720@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Xác nhận lịch đặt khám bệnh", // Subject line
        html: `<p>Bạn nhận được email này vì đặt lịch khám bệnh trên Bookingcare.vn</p>
        <p>Thông tin đặt lịch khám bệnh</p>
        <p><b>Bác sĩ khám bệnh:${dataSend.lastNameDoctor} ${dataSend.firstNameDoctor}</b></p>
        <p><b>Thời gian: ${dataSend.time} - Ngày: ${dataSend.date}/${dataSend.month}/${dataSend.year}</b></p>
        <p>Vui lòng ấn vào link để xác nhận đặt lịch <a href="${process.env.REACT_APP_FRONTEND_URL}/accept-booking?token=${dataSend.token}">Xác nhận</a> </p>
        `, // html body
    });
    console.log(dataSend.token + 12345)
}
module.exports = {
    sentEmail: sentEmail
}