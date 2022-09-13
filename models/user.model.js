import mongoose from 'mongoose';
import { agentSchema } from './qrcode.model.js';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
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
            default: false,
        },
        activeDevice: [agentSchema],
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);

export default User;
