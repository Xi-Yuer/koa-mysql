const {
  create,
  getMomentById,
  getMomentList,
  update,
  remove,
} = require("../../service/moment");

class MomentController {
  //发布
  async create(ctx, next) {
    // 获取发布者以及内容数据
    const userId = ctx.user.id; //在登录验证中间件中将user信息放入到了ctx中，这里可以直接获取到
    const content = ctx.request.body.content;
    const result = await create(userId, content);

    // 将数据插入到数据库中去
    ctx.body = {
      status: 1,
      message: "发布成功",
    };
  }
  // 获取
  async detail(ctx, next) {
    // 获取动态id
    const momentId = ctx.params.momentId;
    // 根据id获取动态数据
    const result = await getMomentById(momentId);
    ctx.body = {
      status: 1,
      data: result[0],
      message: "success",
    };
  }
  async list(ctx, next) {
    // 获取查询数据的条数（offset，limit）
    const { offset, limit } = ctx.query;
    // 根据条件查询
    const result = await getMomentList(offset, limit);
    // 返回数据
    ctx.body = {
      status: 1,
      data: result,
      message: "success",
    };
  }
  // 修改
  async update(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params;
    const { content: newContent } = ctx.request.body;
    // 修改内容
    const result = await update(newContent, momentId);
    ctx.body = {
      status: 1,
      message: `修改内容成功`,
    };
  }
  // 删除
  async remove(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params;

    const result = await remove(momentId);

    ctx.body = {
      status: 1,
      message: "删除成功",
    };
  }
}

module.exports = new MomentController();
