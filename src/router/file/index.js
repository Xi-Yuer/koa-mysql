const Router = require('koa-router')
const fileRouter = new Router({ prefix: '/upload' })

// 保存图片
const { avatarHandler, pictureResize, pictireHandler } = require('../../middleware/file')
// 验证是否登录
const { verifyAuth } = require('../../middleware/user/auth')
// 保存图片信息
const { savaAvatarInfo, savePictureInfo } = require('../../controller/file')

// 用户头像
fileRouter.post('/avatar', verifyAuth, avatarHandler, savaAvatarInfo)
// 动态配图
fileRouter.post("/picture", verifyAuth, pictireHandler, pictureResize, savePictureInfo)

module.exports = fileRouter