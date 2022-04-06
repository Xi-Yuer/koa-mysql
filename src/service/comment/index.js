const connection = require('../../app/database')
class CommentService {
    async create(commentId,content,userId){
        const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?,?,?)`
        const [ result ] = await connection.execute(statement,[ content, commentId, userId ])
        return result
    }
    async reply(momentId, content, id, commentId){ //动态ID 内容 用户ID 回复ID
        const statement = `INSERT INTO comment (content, moment_id, user_id,comment_id) VALUES (?,?,?,?)`
        const [ result ] = await connection.execute(statement,[ content, momentId, id, commentId ])
        return result
    }
    async update(commentId, content) {
        const statement = `UPDATE comment SET content = ? WHERE id = ?`
        const [result] = await connection.execute(statement,[ content, commentId ])
        return result
    }
    async remove(commenId) {
        const statement = `DELETE FROM comment WHERE id = ?`
        const [ result ] = await connection.execute(statement,[ commenId ])
        return result
    }
}

module.exports = new CommentService()