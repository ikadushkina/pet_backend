const ApiError = require("../helper/api.error");
const tokenService = require("../service/token.service");

module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers.token;
    if (!accessToken) return next(ApiError.UnauthorizedErrors());

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) return next(ApiError.UnauthorizedErrors());

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedErrors());
  }
}
