const Router = require("koa-router");

const momentRouter = new Router({ prefix: "/moment" });

const { verifyAuth, verifyPermission } = require("../../middleware/user/auth");
const { create, detail, list, update, remove } = require("../../controller/moment");

// 发表动态
momentRouter.post("/", verifyAuth, create);
// 获取某一条动态详情
momentRouter.get("/:momentId", detail);
// 查询多条动态
momentRouter.get("/", list);
// 修改动态内容
momentRouter.patch("/:momentId", verifyAuth,verifyPermission, update);
// 删除动态
momentRouter.delete("/:momentId",verifyAuth,verifyPermission, remove);

module.exports = momentRouter;
