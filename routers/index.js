const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const Router = require("express").Router;

const router = new Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
