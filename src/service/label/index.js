const connection = require("../../app/database");

class labelService {
  // 创建标签
  async create(name) {
    const stetament = `INSERT INTO label (name) VALUES (?)`;
    const [result] = await connection.execute(stetament, [name]);
    return result;
  }
  // 查询标签是否存在
  async getLabelByName(name) {
    const stetament = `SELECT * FROM label WHERE name = ?`;
    const [result] = await connection.execute(stetament, [name]);
    return result[0];
  }
  // 获取标签
  async getLabels(limit = 10, offset = 0) {
    const stetament = `SELECT * FROM label LIMIT ?,?`;
    const [result] = await connection.query(stetament, [offset, limit]);
    console.log(result);
    return result;
  }
}

module.exports = new labelService();
