const {
  NAME_OR_PASSWORD_IS_NOT_REQUIRE,
  USER_NOT_EXISTS,
  PASSWORD_IS_INCORRENT
} = require("../../constants/err-types");

const { getUserByName } = require("../../service/user");
const { checkPermission } = require('../../service/authService')

const md5password = require('../../utils/password-handle')

const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../local')


// 登录验证

const verifyLogin = async (ctx, next) => {
  // 获取用户名和密码
  const { name, password } = ctx.request.body;

  // 用户名和密码是否为空
  if (!name || !password) {
    const err = new Error(NAME_OR_PASSWORD_IS_NOT_REQUIRE);
    return ctx.app.emit("err", err, ctx);
  }

  //用户是否存在
  const user = await getUserByName(name);

  //用户不存在
  if (!user[0]) {
    const err = new Error(USER_NOT_EXISTS);
    return ctx.app.emit("err", err, ctx);
  }
  //密码是否正确
  if( md5password(password)!== user[0].password ){ //将服务器的加密密码与客户端传来的密码加密进行对比看是否一致
      const err = new Error(PASSWORD_IS_INCORRENT)
      return ctx.app.emit("err", err, ctx);
  }
  ctx.user = user //将用户信息放入到ctx.user身上

  await next();
};



// 授权验证
const verifyAuth = async (ctx,next) =>{

  // 获取token
  const authorization = ctx.headers.authorization

  const token = authorization?.replace('Bearer ', '')
  try {

    const result =  jwt.verify(token,SECRET_KEY)  // { id: 8, name: 'cba', iat: 1649064784, exp: 1649151184 }

    ctx.user = result
    // 有效token通过验证
    await next()

  } catch (error) {

    ctx.body = {
      status: 0,
      message: '无效token'
    }
    
  }

}

// 用户是否具有修改动态的权限
const verifyPermission = async (ctx, next) => {
  // 获取参数
  const [ resourceKey ] = Object.keys(ctx.params)
  const { id:userId } = ctx.user 
  const tableName = Object.keys(ctx.params)[0].replace('Id', '')
  const resourceId = ctx.params[resourceKey]
  // 查询是否具备权限
  const isPermission = await checkPermission(tableName, resourceId, userId)
  if(!isPermission){
    return ctx.body = {
      status:0,
      message:'未授权'
    }
  }
  await next()
}
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
};
