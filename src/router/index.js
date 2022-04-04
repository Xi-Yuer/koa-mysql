const userRouter = require("./user/userRegister");
const authRouter = require("./user/userLogin");
const momentRouter = require("./moment");
const TestRouter = require("./test/index");

module.exports = { userRouter, authRouter, momentRouter, TestRouter };
