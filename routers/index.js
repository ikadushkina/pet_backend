const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const Router = require("express").Router;
const authMiddleware = require("../middleware/auth.middleware");

const router = new Router();

router.use("/auth", authRouter);
router.use("/user", authMiddleware, userRouter);

module.exports = router;
