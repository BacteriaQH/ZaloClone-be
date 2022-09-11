import { checkEmail, createUser, findUser } from '../services/user.service.js';

import { compare, hash } from '../untils/hash.js';
import { generateAccessToken, generateRefreshToken } from '../untils/token.js';
import { checkMailInSMTP } from '../untils/checkMailInSMTP.js';
import { getIO } from '../index.js';

export const CheckEmailController = async (req, res) => {
    const { email } = req.body;
    const result = await checkMailInSMTP(email);
    const user = await checkEmail(email);
    if (!user && result) {
        res.status(200).json({ code: 200, message: 'Valid email and email does not exist in our system' });
    } else if (!result) {
        res.status(404).json({ code: 404, message: 'Invalid email' });
    } else {
        res.status(409).json({ code: 409, message: 'Email already exists' });
    }
};

export const RegisterController = async (req, res) => {
    const body = req.body;
    console.log('controller start');
    const { email, password, name, dob, isMale, address } = body;
    const hashPass = await hash(password);
    const user = await createUser({ email, password: hashPass, name, dob, isMale, address });
    console.log('create success');
    if (user) {
        return res.status(200).json({ code: 200, message: 'User created successfully' });
    } else {
        return res.status(404).json({ code: 404, message: 'User creation failed' });
    }
};

export const LoginWithPasswordController = async (req, res) => {
    const { email, password } = req.body;
    console.log(req);
    const user = await findUser(email);
    if (!user) {
        return res.status(404).json({
            code: 404,
            message: 'User not found',
        });
    }
    if (user && !compare(password, user.password)) {
        return res.status(404).json({
            code: 404,
            message: 'Password is incorrect',
        });
    }
    if (user && compare(password, user.password)) {
        const { password, ...other } = user._doc;

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        });
        return res.status(200).json({
            code: 200,
            message: 'Login success',
            user: {
                ...other,
                accessToken,
            },
        });
    }
};

export const LoginWithOTPController = async (req, res) => {
    const { email } = req.body;
    const user = await findUser(email);
    if (!user) {
        return res.status(404).json({
            code: 404,
            message: 'User not found',
        });
    }
    if (user) {
        const { password, ...other } = user._doc;
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        });
        return res.status(200).json({
            code: 200,
            message: 'Login success',
            user: {
                ...other,
                accessToken,
            },
        });
    }
};

export const LoginWithQrCodeController = async (req, res) => {
    const { email } = req.query.tk;

    const user = await findUser(email);
    const { password, ...other } = user._doc;

    let io = getIO();
    //get socket id
    const socket = io.sockets.adapter.rooms;
    let socketId;
    for (let id of socket) {
        socketId = id;
    }
    console.log(socket);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    io.to(socketId).emit('login-qr-code', {
        code: 200,
        message: 'Login success',
        user: {
            ...other,
            accessToken,
            refreshToken,
        },
    });
    return res.status(200).json({
        code: 200,
        message: 'Login success',
    });
};

export const LogoutController = (req, res) => {
    return res.json('Logout');
};
