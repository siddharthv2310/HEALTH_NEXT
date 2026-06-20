import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Verify Error:", error);
  } else {
    console.log("SMTP Server Ready");
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      html,
    };

    console.log("Sending mail to:", to);

    const info = await transporter.sendMail(mailOptions);

    console.log("Mail sent:", info.messageId);

    return info;

  } catch (error) {
    console.log("Email Error:", error);
    throw error;
  }
};

export default sendEmail;