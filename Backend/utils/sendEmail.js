import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },

  family: 4, // Force IPv4 instead of IPv6
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