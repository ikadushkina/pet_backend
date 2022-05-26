const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token-model");
const { LIFE_TIME_ACCESS, LIFE_TIME_REFRESH } = require("../helper/config");

const generateToken = payload => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: LIFE_TIME_ACCESS });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: LIFE_TIME_REFRESH });
    const diff = Number(LIFE_TIME_ACCESS.replace(LIFE_TIME_ACCESS[LIFE_TIME_ACCESS.length - 1], ""));
    const expires_at = new Date(new Date().getTime() + diff * 60000);

    return {
        accessToken,
        refreshToken,
        expires_at
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

const validateAccessToken = token => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
        return null;
    }
}

const validateRefreshToken = token => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
        return null;
    }
}

const findToken = async (refreshToken) => {
    return TokenModel.findOne({ refreshToken });
}

const setCookieToken = (res, token) => {
    res.cookie("refresh_token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "lax" });
}

const clearCookieToken = res => {
    res.clearCookie("refresh_token").json({ success: true, data: null });
}

module.exports = {
    generateToken,
    saveToken,
    removeToken,
    setCookieToken,
    clearCookieToken,
    validateAccessToken,
    validateRefreshToken,
    findToken
}
