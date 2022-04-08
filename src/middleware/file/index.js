const Multer = require('koa-multer')
const Jimp = require('jimp')
const path = require('path')

// 文件保存中间价
// 头像
const avatarUpload = Multer({ dest: "./uploads/avatar" })
const avatarHandler = avatarUpload.single('avatar')

// 动态配图
const pictureUpload = Multer({ dest: "./uploads/picture" })
const pictireHandler = pictureUpload.array('picture', 9)

// 处理图片
const pictureResize = async (ctx, next) => {
    // 获取所有图像信息(sharp/jimp)
    const files = ctx.req.files
    for (let file of files) {
        const destPath = path.join(file.destination, file.filename)
        Jimp.read(file.path).then((image) => {
            image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
            image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
            image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
        })
    }
    await next()
}


module.exports = {
    avatarHandler,
    pictireHandler,
    pictureResize
}