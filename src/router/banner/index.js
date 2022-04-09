const Router = require('koa-router')

const bannerRouter = new Router({ prefix: "/banner" })
const { savaBannderImg, getAllBannerImg, getSingeBanner, remove } = require('../../controller/banner')
const { bannerHandler } = require('../../middleware/file')
const { pictureResize } = require('../../middleware/file')
// 上传轮播图
bannerRouter.post('/', bannerHandler, pictureResize, savaBannderImg)
// 删除轮播图
bannerRouter.post("/delete/:bannerId", remove)
// 获取轮播图
bannerRouter.get("/", getAllBannerImg)
bannerRouter.get("/:filename", getSingeBanner)

module.exports = bannerRouter