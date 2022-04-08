const Router = require("koa-router");

const { verifyUser, handlePassword } = require("../../../middleware/user");
const { create, avatarInfo, userInfo } = require("../../../controller/user");

const userRouter = new Router({ prefix: "/users" });

// 注册
userRouter.post("/", verifyUser, handlePassword, create);
// 获取用户头像信息
userRouter.get("/:userId/avatar", avatarInfo)
// 获取用户信息
userRouter.get("/:userId", userInfo)
module.exports = userRouter