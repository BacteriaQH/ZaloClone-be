import { validate } from 'deep-email-validator';

export const checkMailInSMTP = async (email) => {
    const result = await validate(email);
    // console.log(result);
    if (result.validators.smtp.valid) return true;
    else return false;
};
