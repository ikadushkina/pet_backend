const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token-model");
const { LIFE_TIME_ACCESS, LIFE_TIME_REFRESH } = require("../helper/config");

const generateToken = payload => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: LIFE_TIME_ACCESS });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: LIFE_TIME_REFRESH });

    return {
        accessToken,
        refreshToken
    }
}

const saveToken = async (userId, refreshToken) => {
    const existedToken = await TokenModel.findOne({ user: userId });
    if (existedToken) {
        existedToken.refreshToken = refreshToken;
        return existedToken.save();
    }

    return TokenModel.create({ user: userId, refreshToken });
}

const removeToken = async refreshToken => {
    return TokenModel.deleteOne({ refreshToken });
}

module.exports = {
    generateToken,
    saveToken,
    removeToken
}
