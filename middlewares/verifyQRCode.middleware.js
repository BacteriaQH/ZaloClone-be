import CryptoJS from 'crypto-js';
import { deobfuscate } from '../untils/deobfuscate.js';

export const verifyQRCode = (req, res, next) => {
    const key = process.env.SECRET_KEY;
    const { tk, phone } = req.query;
    let cipher = tk.split(' ').join('+');

    const m = CryptoJS.AES.decrypt(cipher, key);
    const d = m.toString(CryptoJS.enc.Utf8);
    const M = Number(deobfuscate(d));

    const deltaT = 60000;
    const timeStampNow = Date.now();

    if (timeStampNow - M > deltaT) {
        return res.status(401).send({ timeStampNow, M, message: 'QR code expired' });
    } else {
        next();
    }
};
