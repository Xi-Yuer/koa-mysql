const {
  NAME_OR_PASSWORD_IS_NOT_REQUIRE,
  USER_ALREADY_EXISTS,
  USER_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
} = require("../constants/err-types");

const errorHandler = (err, ctx) => {
  let status, message;

  switch (err.message) {
    case NAME_OR_PASSWORD_IS_NOT_REQUIRE:
      status = 400; //Bad Request
      message = NAME_OR_PASSWORD_IS_NOT_REQUIRE;
      break;

    case USER_ALREADY_EXISTS:
      status = 409; //Conflict 请求冲突
      message = USER_ALREADY_EXISTS;
      break;

    case USER_NOT_EXISTS:
      status = 400; //Bad Request
      message = USER_NOT_EXISTS;
      break;

    case PASSWORD_IS_INCORRENT:
      status = 400; //Bad Request
      message = PASSWORD_IS_INCORRENT;
      break;

    default:
      status = 404;
      message = "发生错误";
  }

  ctx.status = status;
  ctx.body = {
    status: 0,
    message: message,
  };
};

module.exports = errorHandler;
