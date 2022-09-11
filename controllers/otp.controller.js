import * as nodemailer from 'nodemailer';
import { generateOTP } from '../untils/otp.js';
import { compare, hash } from '../untils/hash.js';

import { createOTP, deleteOTP, findOTPWithEmail } from '../services/otp.service.js';

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass,
    },
});

export const CreateOTPController = async (req, res) => {
    const email = req.body.email;
    const otp = generateOTP();

    const hOTP = await hash(otp);

    const mailOptions = {
        from: user,
        to: email,
        subject: 'Sending OTP',
        text: otp,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(404).json({ code: 404, message: 'OTP not created' });
        } else {
            console.log('Email sent: ' + JSON.stringify(info));
        }
    });
    let result = await createOTP(email, hOTP);

    if (result) {
        return res.status(200).json({ code: 200, message: 'OTP created successfully' });
    } else {
        return res.status(404).json({ code: 404, message: 'OTP not created' });
    }
};

export const VerifyOTPController = async (req, res) => {
    const { email, otp } = req.body;
    const result = await findOTPWithEmail(email);
    if (!result.length) {
        return res.status(404).json({ code: 404, message: 'OTP expired' });
    }
    const lastOTP = result[result.length - 1];

    if (lastOTP && !compare(otp, lastOTP.otp)) {
        return res.status(401).json({ code: 401, message: 'OTP invalid' });
    }
    if (lastOTP && compare(otp, lastOTP.otp) && lastOTP.email === email) {
        const dOtp = await deleteOTP(email);
        if (dOtp) {
            return res.status(200).json({ code: 200, message: 'OTP verified' });
        }
    }
};
