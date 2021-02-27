const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shmise25@gmail.com',
    pass: 'tdltsmvlhrizqkdv'
  }
})



const sendEMail = ({toEmail, html}) => {

  const mailOptions = {
    from: 'shmise25@gmail.com',
    to: toEmail,
    subject: 'Please confirm your Email account',
    html : html

  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return error
    } else {
      console.log('Email sent: ' + info.response);
      return info.response
    }
  })
}

const sendVerificationEmail = ({toEmail, link, html}) => {
  return sendEMail({
    toEmail,
    html : html || "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
  })
}

module.exports = { sendEMail, sendVerificationEmail }
