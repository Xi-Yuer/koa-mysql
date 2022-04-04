const jwt = require("jsonwebtoken");

const { SECRET_KEY, EXPIRESIN } = require("../../local");

class AuthController {

  async login(ctx, next) {

    // 生成token
    const { id, name } = ctx.user[0];

    const token = jwt.sign({ id, name }, SECRET_KEY, { expiresIn: EXPIRESIN });

    // 返回token
    ctx.body = {
      status: 1,
      data: { id, name, token },
      message: "success",
    };
    
  }
}
module.exports = new AuthController();
