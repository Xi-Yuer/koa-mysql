const Router = require("koa-router");

const momentRouter = new Router({ prefix: "/moment" });

const { verifyAuth, verifyPermission } = require("../../middleware/user/auth");
const { verifyLabelsExists } = require('../../middleware/labels')

const { create, detail, list, update, remove, addLabels } = require("../../controller/moment");

const { like, authIsLike } = require('../../service/public')

// 发表动态
momentRouter.post("/", verifyAuth, create);
// 获取某一条动态详情
momentRouter.get("/:momentId", detail);
// 查询多条动态
momentRouter.get("/", list);
// 修改动态内容
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
// 删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);
// 给动态点赞👍
momentRouter.post("/:momentId/like", verifyAuth, like("moment"))
// 查询用户是否为该动态点赞
momentRouter.get("/:momentId/islike", verifyAuth, authIsLike('moment'))
// 给动态添加标签
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelsExists, addLabels)

module.exports = momentRouter;
