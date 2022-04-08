const Multer = require('koa-multer')

// 文件保存中间价
const avatarUpload = Multer({ dest: "./uploads/avatar" })
const avatarHandler = avatarUpload.single('avatar')



module.exports = {
    avatarHandler
}