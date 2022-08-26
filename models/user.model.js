import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    os: {
        name: String,
        version: String,
    },
    browser: {
        name: String,
        version: String,
    },
});
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        isMale: {
            type: Boolean,
        },
        dob: {
            type: Date,
        },
        address: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        activeDevice: [deviceSchema],
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);

export default User;
