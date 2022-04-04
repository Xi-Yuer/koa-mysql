const {
  NAME_OR_PASSWORD_IS_NOT_REQUIRE,
  USER_ALREADY_EXISTS,
} = require("../../constants/err-types");

const { getUserByName } = require("../../service/user");

const md5password = require("../../utils/password-handle");

const verifyUser = async (ctx, next) => {
  // 获取用户名和密码
  const { name, password } = ctx.request.body;
  // 用户密码规则不能为空的判断
  if (!name || !password) {
    const err = new Error(NAME_OR_PASSWORD_IS_NOT_REQUIRE);
    return ctx.app.emit("err", err, ctx);
  }
  // 用户已存在
  const result = await getUserByName(name);
  if (result.length) {
    const err = new Error(USER_ALREADY_EXISTS);
    return ctx.app.emit("err", err, ctx);
  }

  await next();
};

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  // 将密码进行加密存储
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
