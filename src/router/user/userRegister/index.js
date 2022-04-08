const Router = require("koa-router");

const { verifyUser, handlePassword } = require("../../../middleware/user");
const { create, avatarInfo } = require("../../../controller/user");

const userRouter = new Router({ prefix: "/users" });

// 注册
userRouter.post("/", verifyUser, handlePassword, create);
// 获取用户信息
userRouter.get("/:userId/avatar", avatarInfo)
module.exports = userRouter