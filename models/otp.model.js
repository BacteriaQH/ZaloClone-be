import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    time: {
        type: Date,
        default: Date.now,
        index: {
            expires: 360,
        },
    },
});

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
