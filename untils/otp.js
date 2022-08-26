import * as OTPGenerator from 'otp-generator';

export const generateOTP = () => {
    const otp = OTPGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
    });
    return otp;
};
