const nodemailer = require('nodemailer');
const config = require('../config.js');
const letter = require('./letter.js');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `kurbatskykv@gmail.com`,
        pass: `Shag2411`,
    }
});
let getMailoptions = function(sender,name,subject,link) {
    return {
        from: `kurbatskykv@gmail.com`, 
        to: sender, 
        subject: subject, 
        html: letter(name,link),
    }
};

module.exports = {
   transporter: transporter,
   getMailoptions: getMailoptions,
};

