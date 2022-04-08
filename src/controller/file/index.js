const { createAvatarInfo, createPicture } = require('../../service/file')
const { updateAvatarUrlById } = require('../../service/user')
const { APP_HOST, APP_PORT } = require('../../app/config')
class FileController {
    async savaAvatarInfo(ctx, next) {
        // 获取图像相关信息
        const { mimetype, size, filename } = ctx.req.file
        // 获取用户id
        const { id } = ctx.user
        // 将图像数据信息保存到数据库中
        await createAvatarInfo(filename, mimetype, size, id)
        // 将图片地址保存到用户信息表的avatar_url字段中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
        await updateAvatarUrlById(avatarUrl, id)
        ctx.body = {
            status: 1,
            message: "上传头像成功"
        }
    }
    async savePictureInfo(ctx, next) {
        // 获取用户id
        const { id: userId } = ctx.user
        // 获取图像信息 
        const files = ctx.req.files
        const { momentId } = ctx.query
        // 将所有的文件信息保存到数据库中
        for (let file of files) {
            const { mimetype, size, filename } = file
            await createPicture(filename, mimetype, size, userId, momentId)
        }
        ctx.body = {
            tatus: 1,
            message: "上传动态配图成功"
        }
    }
}

module.exports = new FileController()