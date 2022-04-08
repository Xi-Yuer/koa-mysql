const connection = require("../../app/database");
class UserService {
  async create(user) {
    //   将user储存到数据库中
    const { name, password } = user;
    const statement = `INSERT INTO users (name,password) VALUES (?,?)`;
    const result = await connection.query(statement, [name, password]);
    return result[0];
  }
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?`;
    const result = await connection.query(statement, [name]);
    return result[0]
  }
  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?`
    const result = await connection.execute(statement, [avatarUrl, userId])
  }
}
module.exports = new UserService();
