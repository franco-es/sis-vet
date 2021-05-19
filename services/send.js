"use strict";
const nodemailer = require("nodemailer");

function registerEmail(email, name) {
  const content = `
      <h1>Bienvenido ${name}</h1>
      <p>Muchas gracias por registrarte!!</p>
      <p>Espero disfrutes tu experiencia con SISVET</p>
    `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "dc2128e80660fd", // generated ethereal user
      pass: "79b096a92371ad", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"prueba-80a1f0@inbox.mailtrap.io', // sender address
    to: `${email}, francoestrella55@gmail.com`, // list of receivers
    subject: "Registro Exitoso", // Subject line
    text: "Hello world?", // plain text body
    html: content, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = { registerEmail: registerEmail };

// 0150813801000123018390
