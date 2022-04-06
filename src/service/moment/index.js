const connection = require("../../app/database");
const { SelectMomentFragment } = require("../SQLFragment");

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id,content) VALUES (?,?)`;
    const [result] = await connection.query(statement, [userId, content]);
    return result;
  }
  async getMomentById(momentId) {
    const statement = SelectMomentFragment("WHERE m.id = ?");

    const [result] = await connection.query(statement, [momentId]);
    return result;
  }

  async getMomentList(offset = 0, limt = 5) {
    const statement = SelectMomentFragment("LIMIT ? , ?");

    const [result] = await connection.execute(statement, [offset, limt]);
    return result;
  }
  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }
  async remove(momentId) {
    const stetament = `DELETE FROM moment WHERE id = ?`;
    const [result] = await connection.execute(stetament, [momentId]);
    return result;
  }
}

module.exports = new MomentService();
