const nodemailer = require('nodemailer')
const config = require('config')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: config.get('SMTP_HOST'),
  port: config.get('SMTP_PORT'),
  secure: false,
  auth: {
    user: config.get('SMTP_USER'),
    pass: config.get('SMTP_PASSWORD')
  }
})

const sendActivationLink = async (to, link) => {
  await transporter.sendMail({
    from: config.get('SMTP_USER'),
    to,
    subject: `Activation link to your profile on ${config.get('CLIENT_URL')}`,
    text: '',
    html:
      `
          <div>
          <h1>To activate your account please use this link => </h1>
          <a href="${link}">Activate your account</a>
          </div>
      `
  }, (error, response) => {
    if (error) {
      console.log(error)
    }
  })
}

module.exports = {sendActivationLink}