import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    return data;
  } 
  catch (error) {
    console.log("Email Error:", error);
    throw error;
  }
};

export default sendEmail;