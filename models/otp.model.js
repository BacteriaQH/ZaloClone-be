import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    phone: String,
    otp: String,
    time: {
        type: Date,
        default: Date.now,
        index: {
            expires: 120,
        },
    },
});

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
