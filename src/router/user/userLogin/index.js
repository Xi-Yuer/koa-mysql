const Router = require("koa-router");

const { login } = require("../../../controller/user/userRegister");

const { verifyLogin } = require("../../../middleware/user/auth");

// 登录
const authRouter = new Router();

authRouter.post("/login", verifyLogin, login);

module.exports = authRouter;
