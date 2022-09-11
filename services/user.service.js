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

export const checkEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const findUser = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (err) {
        console.log(err);
        return false;
    }
};
