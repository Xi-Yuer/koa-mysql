const Router = require("koa-router");

const { verifyAuth } = require("../../middleware/user/auth");
const { success } = require("../../controller/user/index");

const TestRouter = new Router();

TestRouter.get("/test", verifyAuth, success);

module.exports = TestRouter;
