import client from 'twilio';
import { generateOTP } from '../untils/otp.js';
import { hash } from '../untils/hash.js';

import { createOTP } from '../services/otp.service.js';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

const clientTwilio = client(accountSid, authToken);

export const CreateOTPController = async (req, res) => {
    const phone = req.body.phone;
    const otp = generateOTP();

    const hOTP = await hash(otp);

    clientTwilio.messages
        .create({
            body: `Your OTP is ${otp}`,
            from: twilioPhone,
            to: phone,
        })
        .then((message) => console.log(message.sid));

    let result = await createOTP(phone, hOTP);

    if (result) {
        return res.status(200).json({ code: 200, message: 'OTP created successfully' });
    } else {
        return res.status(404).json({ code: 404, message: 'OTP not created' });
    }
};
