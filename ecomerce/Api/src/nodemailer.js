const nodemailer = require("nodemailer")

const config = {
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "4892eba75e2477",
        pass: "add82026e77182"
    }
}
const testMessage = {
    from: 'grupo_pf_supergenial@test.com',
    to: 'test@receiver.com',
    subject: 'test',
    text: 'This is a test from PF project'
}

const sendEmail = async (message) => {
    let transport = nodemailer.createTransport(config)
    return await transport.sendMail(message)
}

module.exports = sendEmail