const service = require("../service/user.service");

const getAllUsers = async (req, res) => {
    try {
        const data = await service.getAllUsers();
        res.json(data)
    } catch (e) {

    }
};

const getUser = async (req, res, next) => {
    try {
        const { email } = req.query;
        const data = await service.getUser(email);
        res.json({
            success: true,
            data
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

module.exports = {
    getAllUsers,
    getUser,
    updateUser
}
