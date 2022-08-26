import { deleteOTP, findOTPWithPhone } from '../services/otp.service.js';
import { compare } from '../untils/hash.js';

export const verifyOTPMiddleware = async (req, res, next) => {
    const { phone, otp } = req.body;
    const result = await findOTPWithPhone(phone);
    if (!result.length) {
        return res.status(404).json({ code: 404, message: 'OTP expired' });
    }
    const lastOTP = result[result.length - 1];

    if (lastOTP && !compare(otp, lastOTP.otp)) {
        return res.status(401).json({ code: 401, message: 'OTP invalid' });
    }
    if (lastOTP && compare(otp, lastOTP.otp) && lastOTP.phone === phone) {
        const dOtp = await deleteOTP(phone);
        if (dOtp) {
            next();
        }
    }
};
