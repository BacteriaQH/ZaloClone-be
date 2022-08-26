import { checkPhone, createUser, findUser } from '../services/user.service.js';

import { compare, hash } from '../untils/hash.js';
import { generateAccessToken, generateRefreshToken } from '../untils/token.js';

export const CheckPhoneController = async (req, res) => {
    const { phone } = req.body;
    const user = await checkPhone(phone);
    if (!user) {
        res.status(200).json({ code: 200, message: 'Phone does not exist' });
    } else {
        res.status(404).json({ code: 404, message: 'Phone exist' });
    }
};

export const RegisterController = async (req, res) => {
    const body = req.body;
    const { phone, password, name, dob, isMale, address } = body;
    const hashPass = await hash(password);
    const user = await createUser({ phone, password: hashPass, name, dob, isMale, address });
    if (user) {
        res.status(200).json({ code: 200, message: 'User created successfully' });
    } else {
        res.status(404).json({ code: 404, message: 'User creation failed' });
    }
};

export const LoginWithPasswordController = async (req, res) => {
    const { phone, password } = req.body;
    const user = await findUser(phone);
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
    const { phone } = req.body;
    const user = await findUser(phone);
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
    const c = req.query.tk;
    const phone = req.query.phone;
    const user = await findUser(phone);
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

    return res.json({ c, phone });
};

export const LogoutController = (req, res) => {
    return res.json('Logout');
};
