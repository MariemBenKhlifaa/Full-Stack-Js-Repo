const nodemailer = require("nodemailer");

const sendEmail = (to, url, txt) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "packandgomail@gmail.com", // generated ethereal user
      pass: "eamitqfivmalwvpc", // generated ethereal password
    },
  });
  var mailOptions = {
    from: "packandgomail@gmail.com",
    to: to,
    subject: "Reset your Password - YouthConnect",
    html: `
          <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to YouthConnect</h2>
          <p>
              Just click the button below to reset your password.
          </p>
          <a href="http://${url}" style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
          <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          <div>http://${url}</div>
          </div>
      `,
  };
  transporter.sendMail(mailOptions, (err, infor) => {
    if (err) return err;
    return infor;
  });
};
module.exports = sendEmail;
