import nodeMailer from 'nodemailer';

let transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kmadhav.webapp@gmail.com',
    pass: 'mad@qwerty'
  }
});

export const sendEmail = (email, quote) => {
  const mailOptions = {
    from: 'kmadhav.webapp@gmail.com',
    to: email,
    subject: 'Here is your todays Quote',
    html:
      '<h1>Quote of the Week:</h1> <h3>' +
      quote +
      '</h3>' +
      '<h5>Thank you for being the fan of Breaking Bad</h5>'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    if (info) console.log('Email Sent ' + info.response);
  });
};

export const isValid = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
