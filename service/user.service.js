const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const tokenService = require("../service/token.service");
const UserDTO = require("../dto/user.dto");
const ApiError = require("../helper/api.error");

const signUp = async (name, email, password) => {
    const candidate = await UserModel.findOne({ email });

    if (candidate) throw ApiError.BadRequest("User already exist");

    const hashPass = bcrypt.hashSync(password, 10);
    const user = await UserModel.create({ name, email, password: hashPass });
    const userDto = new UserDTO(user);     // name, email, id
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
        ...tokens,
        user: userDto
    }

}

const login = async () => {

}

const logout = async () => {

}

const getAllUsers = async () => {
    const users = await UserModel.find({});
    return users.map(user => new UserDTO(user));
}


module.exports = {
    signUp,
    login,
    logout,
    getAllUsers
}
