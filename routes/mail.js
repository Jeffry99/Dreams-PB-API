var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'dreamsphotoboothcr@gmail.com', // Your email address
      pass: process.env.PASS// Your password
  }
});

// Setup email data
let mailOptions = {
  from: '"Dreams Photobooth" <dreamsphotoboothcr@gmail.com>', // Sender address
  to: 'dreamsphotoboothcr@gmail.com', // List of recipients
  subject: '', // Subject line
  html: '' // HTML body
};

const parseMail = (data) => {
  mailOptions.from = '"Dreams Photobooth" <dreamsphotoboothcr@gmail.com>';
  mailOptions.to = 'dreamsphotoboothcr@gmail.com';
  mailOptions.subject = data.name + " está interesado/a en el servicio!";
  mailOptions.html =  `<b>Nombre:</b> ${data.name}<br>
    <b>Teléfono:</b> ${data.phone}<br>
    <b>E-mail:</b> ${data.email}<br>
    <b>Fecha:</b> ${data.date}<br>
    <b>Lugar:</b> ${data.place}<br>
    <b>Mensaje:</b> ${data.message}<br>`;
}

router.post('/', function(req, res, next) {
  const data = req.body;
  parseMail(data);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        res.status(500).json({message: 'There was an error while sending the email'});
        return console.log('Error occurred:', error);
    }
  });
  res.status(200).json({message: 'Data recieved successfully'});
});

module.exports = router;
