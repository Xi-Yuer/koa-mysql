const connection = require('../../app/database')
class FileService {
    async createAvatarInfo(filename, mimetype, size, userId) {
        // 先将用户之前保存的头像删除
        const Sstatement = `SELECT * FROM avatar WHERE user_id = ?`
        const [Sresult] = await connection.query(Sstatement, [userId])
        if (Sresult.length !== 0) {
            const Dstatement = `delete from avatar  where user_id = ?`
            await connection.execute(Dstatement, [userId])
        }
        // 创建新的头像信息
        const statement = `INSERT INTO avatar (mimetype,filename,size,user_id) VALUES(?,?,?,?)`
        const [result] = await connection.execute(statement, [mimetype, filename, size, userId])
        return result
    }
    async getAvatarByUserId(userId) {
        const statement = `SELECT * FROM avatar WHERE user_id = ?`
        const [result] = await connection.query(statement, [userId])
        return result[0]
    }
}

module.exports = new FileService()