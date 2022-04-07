const { create, getLabels } = require("../../service/label");
class labelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await create(name);
    ctx.body = {
      status: 1,
      message: "创建标签成功",
    };
  }
  async list(ctx, next) {
    const { limit, offset } = ctx.query;
    const result = await getLabels(limit, offset);
    ctx.body = result
  }
}
module.exports = new labelController();
