const connection = require("../../app/database");
class AuthService {
  async checkPermission(tableName,id, userId) {
    //根据传入的momentID 和 userID 进行匹配查询看是否能够查询到文章内容，如果有查询到内容说明用户id和文章作者id匹配，有权限进行修改和删除等操作
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?`;
    const [result] = await connection.query(statement, [id, userId]);
    return result.length === 0 ? false : true;
  }
}
module.exports = new AuthService();
