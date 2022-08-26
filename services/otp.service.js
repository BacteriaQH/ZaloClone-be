import OTP from '../models/otp.model.js';

export const createOTP = async (phone, otp) => {
    try {
        const otpR = await OTP.create({ phone, otp });
        return otpR ? 1 : 0;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const findOTPWithPhone = async (phone) => {
    try {
        const otpR = await OTP.find({ phone });
        return otpR;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const deleteOTP = async (phone) => {
    try {
        await OTP.deleteMany({ phone });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
