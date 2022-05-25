const Router = require("express").Router;
const controller = require("../controllers/user.controller");

const router = new Router();

router.get("/me", controller.getUser);
router.post("/update", controller.updateUser);

module.exports = router;
