const Router = require('koa-router')
const fileRouter = new Router({ prefix: '/upload' })

// 保存图片
const { avatarHandler } = require('../../middleware/file')
// 验证是否登录
const { verifyAuth } = require('../../middleware/user/auth')
// 保存图片信息
const { savaAvatarInfo } = require('../../controller/file')

fileRouter.post('/avatar', verifyAuth, avatarHandler, savaAvatarInfo)

module.exports = fileRouter