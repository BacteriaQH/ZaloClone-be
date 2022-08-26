import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);

export const hash = async (pass) => {
    const hash = await bcrypt.hash(pass, salt);
    return hash;
};

export const compare = async (bodyPass, dbPass) => {
    return await bcrypt.compare(bodyPass, dbPass);
};
