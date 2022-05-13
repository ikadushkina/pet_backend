const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token-model");

const generateToken = payload => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFE || "15m"})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE || "15m"})

    return {
        accessToken,
        refreshToken
    }
}

const saveToken = async (userId, refreshToken) => {
    const existedToken = await TokenModel.findOne({ user: userId });
    if (existedToken) {
        existedToken.refreshToken = refreshToken;
        return await existedToken.save();
    }

    return await TokenModel.create({user: userId, refreshToken});
}

module.exports = {
    generateToken,
    saveToken
}
