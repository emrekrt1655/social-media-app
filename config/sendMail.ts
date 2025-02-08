const nodemailer = require("nodemailer");

const SENDER_EMAIL = `${process.env.EMAIL}`;
const PASS = `${process.env.PASS}`;

//send mail
const sendMail = async (to: string, url: string, txt: string) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SENDER_EMAIL,
        pass: PASS,
      },
    });
    const mailOptions = {
      from: SENDER_EMAIL,
      to: to,
      subject: "Lorem Minds Activation Email",
      html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Lorem Minds.</h2>
            <p>Congratulations! You're almost set to start using Lorem Minds.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
          `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default sendMail;
