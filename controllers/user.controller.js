const service = require("../service/user.service");
const tokenService = require("../service/token.service");
const fs = require("fs");
const path = require("path");

const getAllUsers = async (req, res) => {
    try {
        const data = await service.getAllUsers();
        res.json(data)
    } catch (e) {

    }
};

const getUser = async (req, res, next) => {
    try {
        const accessToken = req.headers.token;
        const userData = tokenService.validateAccessToken(accessToken);
        const user = await service.getUser(userData.email);
        fs.readFile(path.resolve(__dirname, "../uploads/avatars", `${user.id}.jpg`), "base64", (err, data) => {
            const avatar = "data:image/png;base64," + data;
            res.json({
                success: true,
                data: {
                    ...user,
                    avatar
                }
            });
        });
    } catch (e) {
        next(e);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const data = await service.updateUser(req.body);
        res.json({
            success: true,
            data
        });
    } catch (e) {
        next(e);
    }
};

const uploadAvatar = async (req, res, next) => {
    try {
        const user = req.query.user_id;
        await service.updateUser({id: user, avatar: `${user}.jpg`});
        const data = req.body.image.replace("data:image/png;base64,", "");
        await fs.writeFile(path.resolve(__dirname, "../uploads/avatars", `${user}.jpg`), data, "base64", () => {});
        res.json({
            success: true,
            data
        });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    uploadAvatar
}
