import CryptoJS from 'crypto-js';

export const verifyQRCode = (req, res, next) => {
    const key = process.env.SECRET_KEY;
    const { tk, phone } = req.query;

    const deltaT = 60;
    const timeStampNow = Date.now();

    // const bytes = CryptoJS.AES.decrypt(tk, key, {
    //     format: CryptoJS.format.Hex,
    // });
    // const originalText = bytes.toString(CryptoJS.enc.Utf8);

    next();
};
