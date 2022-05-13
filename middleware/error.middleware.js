const ApiError = require("../helper/api.error");

module.exports = (err, req, res) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        })
    }
    return res.status(500).json({ message: err.message });
};
