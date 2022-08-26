import express from 'express';
const router = express.Router();

import {
    CheckPhoneController,
    LoginWithPasswordController,
    LoginWithOTPController,
    LoginWithQrCodeController,
    LogoutController,
    RegisterController,
} from '../controllers/user.controller.js';

import { GenerateQRCodeController } from '../controllers/qrcode.controller.js';

import { CreateOTPController } from '../controllers/otp.controller.js';

import { verifyOTPMiddleware } from '../middlewares/verifyOTP.middleware.js';
import { verifyQRCode } from '../middlewares/verifyQRCode.middleware.js';

const initWebRoutes = (app) => {
    router.post('/reg/check-phone', CheckPhoneController);
    router.get('/g/otp', CreateOTPController);
    router.post('/register', verifyOTPMiddleware, RegisterController);

    router.get('/generate-qr', GenerateQRCodeController);

    router.post('/login/pwd', LoginWithPasswordController);
    router.post('/login/otp', verifyOTPMiddleware, LoginWithOTPController);
    router.get('/login/qr', verifyQRCode, LoginWithQrCodeController);

    router.get('/logout', LogoutController);
    router.get('/chat');
    ///

    ///

    return app.use('/api', router);
};

export default initWebRoutes;
