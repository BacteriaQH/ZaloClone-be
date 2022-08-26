import CryptoJS from 'crypto-js';
import { obfuscate } from '../untils/obfuscator.js';

import { generateQRCode } from '../untils/qrcode.js';
import { generateRandomString } from '../untils/random.js';

export const GenerateQRCodeController = async (req, res) => {
    const preUrl = `${process.env.BASE_URL}/api/login/qr`;
    const key = process.env.SECRET_KEY;

    const timestamp = Date.now().toString();
    const rStr = generateRandomString(timestamp.length);

    /**
     * obfuscate: merge alternate  2 string
     */
    const m = obfuscate(timestamp, rStr).join('');

    const c = CryptoJS.AES.encrypt(m, key).toString();

    const url = `${preUrl}?tk=${c}`;

    const qrCode = await generateQRCode(url);
    const imgTag = `<img src="${qrCode}" alt="qrcode" />`;
    return res.send({ rStr, timestamp, url, qr: imgTag });
};
