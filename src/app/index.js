const koa = require("koa");

const bodyParser = require("koa-bodyparser");

const Router = require("../router"); //导入所有路由

const app = new koa();

app.use(bodyParser());

const RouterArray = Object.values(Router);

// 遍历注册路由
RouterArray.forEach((RouteItem) => {
  app.use(RouteItem.routes());
  app.use(RouteItem.allowedMethods());// 不支持的请求
});

// 监听错误信息
app.on("err", require("./error-handle"));

module.exports = app;
