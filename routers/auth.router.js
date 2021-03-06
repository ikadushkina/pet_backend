const Router = require("express").Router;
const controller = require("../controllers/auth.controller");
const controllerUser = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = new Router();

router.post("/sign-up", controller.signUp);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/refresh", controller.refreshToken);
//test endpoint
router.get("/users", authMiddleware, controllerUser.getAllUsers);

module.exports = router;
