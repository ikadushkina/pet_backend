const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const tokenService = require("../service/token.service");
const UserDTO = require("../dto/user.dto");
const ApiError = require("../helper/api.error");

const signUp = async (first_name, last_name, phone_number, email, password) => {
    const candidate = await UserModel.findOne({ email }, { _id: 1 });

    if (candidate) throw ApiError.BadRequest("User already exist");

    const hashPass = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
        first_name,
        last_name,
        phone_number,
        email,
        password: hashPass,
    });
    const userDto = new UserDTO(user);
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
        ...tokens,
        user: userDto
    }
}

const login = async (email, password) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw ApiError.BadRequest("Invalid email or password");
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) throw ApiError.BadRequest("Invalid email or password");

    const userDto = new UserDTO(user);
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
        ...tokens,
        user: userDto
    }
}

const logout = async refreshToken => {
    return tokenService.removeToken(refreshToken);
}

const refresh = async refreshToken => {
    if (!refreshToken) throw ApiError.UnauthorizedErrors();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenDB) throw ApiError.UnauthorizedErrors();

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDTO(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
        ...tokens,
        user: userDto
    }
}

const getAllUsers = async () => {
    const users = await UserModel.find({});
    return users.map(user => new UserDTO(user));
}

const getUser = async (email) => {
    const user = await UserModel.findOne({ email });
    return new UserDTO(user);
}

const updateUser = async ({ id, first_name, last_name, phone_number, email, avatar }) => {
    await UserModel.updateOne({ id }, { $set: { first_name, last_name, phone_number, email, avatar }});
    const user = await UserModel.findOne({ id });
    return new UserDTO(user);
}

module.exports = {
    signUp,
    login,
    logout,
    getAllUsers,
    getUser,
    updateUser,
    refresh
}
