const service = require("../../service/user");
const { getAvatarByUserId } = require('../../service/file')
const fs = require('fs')
class UserController {
  async create(ctx, next) {
    // 获取客户端传递过来的用户信息
    const user = ctx.request.body;
    // 创建用户
    const result = await service.create(user);
    // 给客户端返回结果
    if (result) {
      ctx.body = {
        status: 1,
        message: "创建用户成功",
      };
    }
  }
  async success(ctx, next) {
    ctx.body = {
      status: 1,
      message: "授权成功",
    };
  }
  async avatarInfo(ctx, next) {
    const { userId } = ctx.params
    const avatarResult = await getAvatarByUserId(userId)
    const { filename, mimetype } = avatarResult
    // image/png
    ctx.response.set('content-type', mimetype)
    ctx.body = fs.createReadStream(`./uploads/avatar/${filename}`)
  }
}

module.exports = new UserController();
