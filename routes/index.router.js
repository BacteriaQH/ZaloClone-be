import express from 'express';
const router = express.Router();

import {
    CheckEmailController,
    LoginWithPasswordController,
    LoginWithOTPController,
    LoginWithQrCodeController,
    LogoutController,
    RegisterController,
} from '../controllers/user.controller.js';

import { GenerateQRCodeController, VerifyQRCodeController } from '../controllers/qrcode.controller.js';

import { CreateOTPController, VerifyOTPController } from '../controllers/otp.controller.js';

import { verifyOTPMiddleware } from '../middlewares/verifyOTP.middleware.js';

const initWebRoutes = (app) => {
    router.post('/reg/check-email', CheckEmailController);
    router.get('/generate/otp', CreateOTPController);
    router.post('/verify/otp', VerifyOTPController);
    router.post('/register', RegisterController);
    router.get('/generate/qr', GenerateQRCodeController);

    router.post('/login/pwd', LoginWithPasswordController);
    router.post('/login/otp', verifyOTPMiddleware, LoginWithOTPController);

    // mobile => server
    router.get('/verify/qr', VerifyQRCodeController);
    router.post('/login/qr', LoginWithQrCodeController);
    router.get('/logout', LogoutController);
    router.get('/chat');

    return app.use('/api', router);
};

export default initWebRoutes;
