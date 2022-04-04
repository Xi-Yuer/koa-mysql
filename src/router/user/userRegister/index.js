const Router = require("koa-router");

const { verifyUser, handlePassword } = require("../../../middleware/user");
const { create } = require("../../../controller/user");

const userRouter = new Router({ prefix: "/users" });

// 注册
userRouter.post("/", verifyUser, handlePassword, create);
module.exports = userRouter