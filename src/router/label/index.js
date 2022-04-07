const Router = require("koa-router");
const { verifyAuth } = require("../../middleware/user/auth");

const { create, list } = require("../../controller/label");

const labelRouter = new Router({ prefix: "/label" });

// 创建标签
labelRouter.post("/", verifyAuth, verifyAuth, create);
// 获取标签
labelRouter.get("/", list);

module.exports = labelRouter;
