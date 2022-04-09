const {
  create,
  getMomentById,
  getMomentList,
  getUserAllMoment,
  update,
  remove,
  hasLabel,
  addLabels,
} = require("../../service/moment");

const { getFileByFileName } = require('../../service/file')
const { APP_HOST, APP_PORT } = require('../../app/config')

const fs = require('fs')

class MomentController {
  //发布动态
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
  // 获取动态
  async detail(ctx, next) {
    // 获取动态id
    const momentId = ctx.params.momentId;
    // 根据id获取动态数据
    const result = await getMomentById(momentId);
    ctx.body = {
      status: 1,
      data: result,
      message: "success",
    };
  }
  // 获取动态
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
  // 获取某用户全部动态
  async userAllMoment(ctx, next) {
    const { userId } = ctx.params
    const result = await getUserAllMoment(userId)
    ctx.body = {
      status: 1,
      data: result,
      message: 'suceess'
    }
  }
  // 修改动态
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
  // 删除动态
  async remove(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params;

    const result = await remove(momentId);

    ctx.body = {
      status: 1,
      message: "删除成功",
    };
  }
  // 给动态添加标签
  async addLabels(ctx, next) {
    // 获取到需要给文章添加的标签以及动态的id
    const { labels } = ctx;
    const { momentId } = ctx.params;
    // 创建动态和标签的关系表
    for (let label of labels) {
      // 判断该动态是否已经有该标签
      const isExist = await hasLabel(momentId, label.id);
      // 如果不存在
      if (!isExist) {
        // 如果文章不存在该标签，才需要给文章创建标签
        await addLabels(momentId, label.id);
      }
    }
    ctx.body = {
      status: 1,
      message: "给动态添加标签成功",
    };
  }
  async fileInfo(ctx, next) {
    let { filename } = ctx.params
    const { type } = ctx.query
    const fileInfo = await getFileByFileName(filename)
    const types = ['small', 'middle', 'large']
    if (types.some(item => item === type)) {
      filename = filename + '-' + type
    }
    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`./uploads/picture/${filename}`)
  }
}
module.exports = new MomentController();
