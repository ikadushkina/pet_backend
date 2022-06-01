const Router = require("express").Router;
const controller = require("../controllers/user.controller");

const router = new Router();

router.get("/me", controller.getUser);
router.post("/update", controller.updateUser);
router.post("/upload/avatar", controller.uploadAvatar);

module.exports = router;
