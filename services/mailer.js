const nodemailer = require('nodemailer');

async function send(emailBody) {
    let account = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: `<${account.user}>`, // sender address
        to: '<somebody>', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: emailBody || 'Hey me' // plain text body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

send().catch(console.error);

module.exports = send;
