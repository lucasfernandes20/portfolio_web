import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const ENV = process.env.ENV;
const HOST = process.env.NEXT_PUBLIC_SMTP_HOST;
const PORT = process.env.NEXT_PUBLIC_SMTP_PORT;
const USERNAME = process.env.NEXT_PUBLIC_SMTP_USERNAME;
const PASSWORD = process.env.NEXT_PUBLIC_SMTP_PASSWORD;
const RECEIVER_EMAIL = process.env.NEXT_PUBLIC_EMAIL;

export async function POST(request: Request) {
  try {
    if (ENV !== 'production') {
      return NextResponse.json({ message: 'test' }, { status: 200 });
    }
    const transporter = nodemailer.createTransport({
      host: HOST,
      port: Number(PORT),
      secure: true,
      auth: {
        user: USERNAME,
        pass: PASSWORD
      }
    });
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    }

    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`, // sender address
      to: `"${RECEIVER_EMAIL}"`, // list of receivers
      replyTo: email,
      subject: 'Contact through the web portfolio ✔', // Subject line
      text: message, // plain text body
      html: `<b>${name}</b><br/><br/><p>${message}</p>` // html body
    });

    return NextResponse.json(info, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { error: 'error when trying to send email' },
      { status: 500 }
    );
  }
}
