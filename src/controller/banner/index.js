const { createBannderImg, getAllBanner } = require('../../service/bannder')
const { APP_HOST, APP_PORT } = require('../../app/config')
const fs = require('fs')
class BannerController {
    async savaBannderImg(ctx, next) {
        // 获取图像信息
        const files = ctx.req.files
        for (let file of files) {
            const { mimetype, size, filename } = file
            await createBannderImg(mimetype, size, filename)
        }
        ctx.body = {
            tatus: 1,
            message: "上传轮播图成功"
        }
    }
    async getAllBannerImg(ctx, next) {
        const result = await getAllBanner()
        const banner = []
        for (let item of result) {
            banner.push(`${APP_HOST}:${APP_PORT}/banner/${item.filename}`)
        }
        ctx.body = { banner }
    }
    async getSingeBanner(ctx, next) {
        let { filename } = ctx.params
        const { type } = ctx.query
        const types = ['small', 'middle', 'large']
        if (types.some(item => item === type)) { 
            filename = filename + '-' + type
          }
        ctx.response.set('content-type', 'image/jpeg')
        ctx.body = fs.createReadStream(`./uploads/banner/${filename}`)
    }
}
module.exports = new BannerController()