const Router = require('koa-router')

const bannderRouter = new Router({ prefix: "/banner" })
const { savaBannderImg, getAllBannerImg, getSingeBanner } = require('../../controller/banner')
const { bannerHandler } = require('../../middleware/file')
const { pictureResize } = require('../../middleware/file')
// 上传轮播图
bannderRouter.post('/', bannerHandler, pictureResize, savaBannderImg)
// 获取轮播图
bannderRouter.get("/", getAllBannerImg)
bannderRouter.get("/:filename", getSingeBanner)

module.exports = bannderRouter