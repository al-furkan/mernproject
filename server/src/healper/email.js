const nodemailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("../secret");



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: smtpUsername,
      pass: smtpPassword,
    }
  });


const sendEmailWithNodeMailer = async(emailData) =>{
       
    try{
        const mailOptions={
            from: smtpUsername, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            text: "Hello world?", // plain text body
            html: emailData.html, // html body
        }
       const info =await transporter.sendMail(mailOptions);
       
       console.log('Message send: %s',info.response);
    } catch(error){
        console.error('Error occured  while send email:', error );
        throw error;
    }
}

module.exports = sendEmailWithNodeMailer;