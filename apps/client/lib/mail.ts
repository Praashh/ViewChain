import nodemailer from "nodemailer";

export const user: string = process.env.NEXT_PUBLIC_MAIL_USER!;

const app_password: string = process.env.NEXT_PUBLIC_MAIL_APP_PASSWORD!;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smt.gamil.com",
  port: 587,
  secure: false,
  auth: {
    user: user,
    pass: app_password,
  },
});