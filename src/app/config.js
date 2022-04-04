const dotenv = require("dotenv");

// 调用该函数之后，可以将根目录文件夹下的.env文件中的变量注入到progress中的环境变量中去
dotenv.config();

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_ROOT,
  MYSQL_PASSWORD,
} = process.env;
