import CryptoJS from 'crypto-js';

import { obfuscate } from '../untils/obfuscator.js';

import { generateQRCode } from '../untils/qrcode.js';
import { generateRandomString } from '../untils/random.js';
import { getIO } from '../index.js';
import { createQRCode, getQRCode } from '../services/qrcode.service.js';
import { deobfuscate } from '../untils/deobfuscate.js';
import { findUser } from '../services/user.service.js';

export const GenerateQRCodeController = async (req, res) => {
    const preUrl = `${process.env.BASE_URL}/api/verify/qr`;
    const key = process.env.SECRET_KEY;

    let io = getIO();

    //get user ip
    var ip = req.socket.remoteAddress;

    //get user agent
    const agent = req.headers['user-agent'].toString();
    let arr = agent.split(' (');
    arr = arr.map((i) => {
        return i.split(') ');
    });
    let agentObject = {};
    agentObject = {
        browser: {
            name: arr[2][1].split(' ')[0].toString().split('/')[0],
            version: arr[2][1].split(' ')[0].toString().split('/')[1],
        },
        os: {
            name: arr[1][0].split(' ')[0],
            version: arr[1][0].split(' ')[2],
        },
    };

    //get socket id
    const socket = io.sockets.adapter.rooms;
    let socketId;
    for (let id of socket) {
        socketId = id;
    }
    console.log(socket);

    const timestamp = Date.now().toString();
    setTimeout(() => {
        io.to(socketId).emit('qr-code-expired');
    }, 60000);
    const rStr = generateRandomString(timestamp.length);

    /**
     * obfuscate: merge alternate 2 string
     */
    const preM = obfuscate(timestamp, rStr).join('');

    /**
     * m: add socketId to preM
     */
    const m = `${preM}.${socketId}`;
    const c = CryptoJS.AES.encrypt(m, key).toString();

    const createQR = await createQRCode(c, socketId, agentObject, ip);

    const url = `${preUrl}?tk=${c}`;

    const qrCode = await generateQRCode(url);
    const imgTag = `<img src="${qrCode}" />`;
    return res.json({ c, agent, ip, socketId, imgTag });
};

export const VerifyQRCodeController = async (req, res) => {
    let io = getIO();

    const key = process.env.SECRET_KEY;

    const { tk, email } = req.query;
    let cipher = tk.split(' ').join('+');

    const m = CryptoJS.AES.decrypt(cipher, key);
    const d = m.toString(CryptoJS.enc.Utf8);
    const [preM, socketID] = d.split('.');
    const M = Number(deobfuscate(preM));
    const qrcode = await getQRCode(socketID);
    const { _id, name } = await findUser(email);
    const deltaT = 60000;
    const timeStampNow = Date.now();

    if (timeStampNow - M > deltaT) {
        return res.status(401).send({ code: 401, d, timeStampNow, M, socketID, message: 'QR code expired' });
    } else {
        if (user && qrcode && qrcode.socketId === socketID) {
            const { socketID, userAgent } = qrcode;
            io.to(socketID).emit('qr-code-verifing', { email, _id, name });
            return res.status(200).send({ code: 200, userAgent });
        }
    }
};
