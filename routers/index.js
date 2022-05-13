const authRouter = require("./auth.router");
const Router = require("express").Router;

const router = new Router();

router.use("/auth", authRouter);

module.exports = router;