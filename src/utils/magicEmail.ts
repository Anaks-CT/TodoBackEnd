import nodemailer from "nodemailer";
import ErrorResponse from "../error/errorResponse";

export const sendMagicLinkEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    html: `<a href="http://localhost:8001/api/v1/user/verify?token=${token}">Log in to Todo App</a>`,
  };
  await transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
      throw ErrorResponse.internalError(error.message)
    } else {
      console.log('Email sent successfully')
    }
  });
};
