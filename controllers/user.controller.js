const service = require("../service/user.service");

const getAllUsers = async (req, res) => {
    try {
        const data = await service.getAllUsers();
        res.json(data)
    } catch (e) {

    }
};

module.exports = {
    getAllUsers,
}
