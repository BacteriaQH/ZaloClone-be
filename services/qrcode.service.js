import QRCode from '../models/qrcode.model.js';

export const createQRCode = async (cipher, socketId, userAgent, ip) => {
    try {
        const qrcode = await QRCode.create({ cipher, socketId, userAgent, ip });
        return qrcode ? 1 : 0;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const getQRCode = async (socketId) => {
    try {
        const qrcode = await QRCode.findOne({ socketId });
        return qrcode;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const deleteQRCode = async (socketId) => {
    try {
        const qrcode = await QRCode.deleteOne({ socketId });
        return qrcode ? 1 : 0;
    } catch (error) {
        console.error(error);
        return false;
    }
};
