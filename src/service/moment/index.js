const connection = require("../../app/database");
const { SelectMomentFragment } = require("../SQLFragment");
const { APP_PORT, APP_HOST } = require('../../app/config')

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id,content) VALUES (?,?)`;
    const [result] = await connection.query(statement, [userId, content]);
    return result;
  }
  async getMomentById(momentId) {
    const statement = SelectMomentFragment();

    const [result] = await connection.query(statement, [momentId]);
    return result;
  }

  async getMomentList(offset = 0, limit = 10) {
    const statement = `SELECT m.id id,m.content content, m.likeCount,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl', u.avatar_url) author,
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id ) momentCount,
    (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id ) labelCount,
    (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id 
    ORDER BY m.likeCount DESC, momentCount DESC
    LIMIT ?,?
    `;
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }
  async getUserAllMoment(userId) {
    const statement = `SELECT m.id id,m.content content, m.likeCount,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl', u.avatar_url) author,
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id ) momentCount,
    (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id ) labelCount,
    (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id 
     where m.user_id = ?
    ORDER BY m.likeCount DESC, momentCount DESC;
    `;
    const [result] = await connection.execute(statement, [userId]);
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
  async hasLabel(momentId, labelId) {
    const stetament = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`
    const [result] = await connection.execute(stetament, [momentId, labelId])
    return result[0] ? true : false
  }
  async addLabels(momentId, labelId) {
    const stetament = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)`
    const [result] = await connection.execute(stetament, [momentId, labelId])
    return result
  }
}

module.exports = new MomentService();
