import expressAsyncHandler from 'express-async-handler';
import * as dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

// setting trasporter for create smtp server to send email 
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMTP_PASS
    }
});

// handling email transfer events 
export const sendEmail = expressAsyncHandler(async (req, res) => {
    const { receiverEmail, subject, message } = req.body;
    console.log( receiverEmail, subject, message);

    const mailOptions = {
        from: process.env.SMPT_USER,
        to: receiverEmail,
        subject: subject,
        text: message 
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
});
