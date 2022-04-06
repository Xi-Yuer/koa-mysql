const { create, reply, update, remove, authIsLike } = require("../../service/comment");
class commentCtroller {
  async create(ctx, next) {
    // 获取动态id，用户id和评论内容
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    const result = await create(momentId, content, id);

    ctx.body = {
      status: 1,
      mesage: "发表评论成功",
    };
  }
  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    const result = await reply(momentId, content, id, commentId); //动态ID 内容 用户ID 回复ID

    ctx.body = {
      status: 1,
      message: "回复成功",
    };
  }
  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;

    const result = await update(commentId, content);

    ctx.body = {
      status: 1,
      message: "修改评论成功",
      data: result,
    };
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await remove(commentId);
    ctx.body = {
      status: 1,
      message: "删除评论成功",
      data: result,
    };
  }
}

module.exports = new commentCtroller();
