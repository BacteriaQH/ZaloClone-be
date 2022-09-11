import mongoose from 'mongoose';

export const agentSchema = new mongoose.Schema({
    brower: {
        name: String,
        version: String,
    },
    os: {
        name: String,
        version: String,
    },
});
const qrcodeSchema = new mongoose.Schema(
    {
        ciper: String,
        socketId: String,
        userAgent: agentSchema,
        ip: String,
        time: {
            type: Date,
            default: Date.now,
            index: {
                expires: 86400,
            },
        },
    },
    {
        timestamps: true,
    },
);

const QRCode = mongoose.model('QRCode', qrcodeSchema);

export default QRCode;
