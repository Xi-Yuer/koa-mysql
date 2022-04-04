const app = require("./app");

const { APP_PORT } = require("./app/config");

app.listen(APP_PORT, () => {
  console.log("服务器启动成功!", `端口号为 http://localhost:${APP_PORT}`);
});
