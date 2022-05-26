const userService = require("../service/user.service");
const tokenService = require("../service/token.service");

const signUp = async (req, res, next) => {
    try {
        const { first_name, last_name, phone_number, email, password } = req.body;
        const data = await userService.signUp(first_name, last_name, phone_number, email, password);
        tokenService.setCookieToken(res, data.refreshToken);
        res.json({
            success: true,
            data
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await userService.login(email, password);
        tokenService.setCookieToken(res, data.refreshToken);

        res.json({
            success: true,
            data
        });
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        const { refresh_token } = req.cookies;
        await userService.logout(refresh_token);
        tokenService.clearCookieToken(res);
    } catch (e) {
        next(e);
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const { refresh_token } = req.cookies;
        const data = await userService.refresh(refresh_token);
        tokenService.setCookieToken(res, data.refreshToken);

        res.json({
            success: true,
            data
        });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    signUp,
    login,
    logout,
    refreshToken
}
