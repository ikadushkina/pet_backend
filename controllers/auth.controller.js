const userService = require("../service/user.service");

const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const data = await userService.signUp(name, email, password);
        res.cookie("refresh_token", data.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "lax" });

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
        res.cookie("refresh_token", data.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "lax" });

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
        res.clearCookie("refresh_token").json({ success: true, data: null });
    } catch (e) {
        next(e);
    }
}

const refreshToken = async (req, res, next) => {
    try {
        res.json("Test data");
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
