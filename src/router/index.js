const userRouter = require("./user/userRegister");
const authRouter = require("./user/userLogin");
const momentRouter = require("./moment");
const commentRouter = require('./comment')
const labelRouter = require('./label')
const fileRouter = require('./file')
const bannderRouter = require('./banner')
const TestRouter = require("./test/index");

module.exports = { userRouter, authRouter, momentRouter, commentRouter, labelRouter, bannderRouter, fileRouter, TestRouter };
