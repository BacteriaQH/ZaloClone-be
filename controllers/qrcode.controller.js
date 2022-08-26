import CryptoJS from 'crypto-js';

import { generateQRCode } from '../untils/qrcode.js';
import { generateRandomString } from '../untils/random.js';

export const GenerateQRCodeController = async (req, res) => {
    const preUrl = `${process.env.BASE_URL}/api/login/qr`;

    const rStr = generateRandomString(20);
    const timestamp = Date.now();

    const m = `${rStr}${timestamp}`;
    const key = process.env.SECRET_KEY;

    const c = CryptoJS.AES.encrypt(m, key, {
        format: CryptoJS.format.Hex,
    }).toString();

    const url = `${preUrl}?tk=${c}`;

    const qrCode = await generateQRCode(url);
    const imgTag = `<img src="${qrCode}" alt="qrcode" />`;
    return res.send({ url, qr: imgTag });
};
