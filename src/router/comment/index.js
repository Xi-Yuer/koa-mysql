const Router = require("koa-router");

const commentRouter = new Router({ prefix: "/comment" });

const { like, authIsLike } = require("../../service/public");

const { verifyAuth, verifyPermission } = require("../../middleware/user/auth");
const { create, reply, update, remove, list } = require("../../controller/comment");

// 评论
commentRouter.post("/", verifyAuth, create);
// 回复评论
commentRouter.post("/:commentId/reply", verifyAuth, reply);
// 修改评论
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, update);
// 删除评论
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, remove);
// 给评论点赞
commentRouter.post("/:commentId/like", verifyAuth, like("comment"));
// 查询用户是否为该评论点赞
commentRouter.get("/:commentId/islike", verifyAuth, authIsLike("comment"));
// 获取评论列表
commentRouter.get("/", list);

module.exports = commentRouter;
