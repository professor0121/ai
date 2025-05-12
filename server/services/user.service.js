import userModel from '../models/user.model.js';

 const createUser = async (email, password) => {
    if (!email || !password) {
        throw new error('Email and Password id required')
    }
    const hashPassword = await userModel.hashPassword(password)
    const user = await userModel.create({
        email,
        password: hashPassword
    });
    return user;
}

export default createUser;