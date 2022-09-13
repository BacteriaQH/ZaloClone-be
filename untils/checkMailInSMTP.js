import { validate } from 'deep-email-validator';

export const checkMailInSMTP = async (email) => {
    const result = await validate({
        email: email,
        sender: email,
        validateRegex: true,
        validateMx: true,
        validateTypo: true,
        validateDisposable: true,
        validateSMTP: email.includes('@gmail.com'),
    });
    // console.log(result);
    if (result.validators.smtp.valid) return true;
    else return false;
};
