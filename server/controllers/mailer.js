import nodemailer from "nodemailer";
import mailGen from "mailgen";

import ENV from "../config.js";

//https://ethereal.email/create

let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, //true for 465, false for other ports
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: ENV.EMAIL,
    pass: ENV.PASSWORD,
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new mailGen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js",
  },
});

/** POST: http://localhost:8080/api/registerMail
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
   "text" : "",
  "subject" : "",  
}
*/

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  //body of the email

  var email = {
    body: {
      name: username,
      intro: text || "Probando probando wena wena",
      outro: "Need help or have a question? ",
    },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || "Sign up successful",
    html: emailBody,
  };

  //Send mail

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us!" });
    })
    .catch((error) => res.status(500).send({ error }));
};
