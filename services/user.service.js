import User from '../models/user.model.js';

export const createUser = async (data) => {
    try {
        const user = await User.create(data);
        return user;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const checkPhone = async (phone) => {
    try {
        const user = await User.findOne({ phone });
        return user;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const findUser = async (phone) => {
    try {
        const user = await User.findOne({ phone: phone });
        return user;
    } catch (err) {
        console.log(err);
        return false;
    }
};
