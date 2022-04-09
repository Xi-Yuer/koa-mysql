const connection = require('../../app/database')

class BannderService {
    async createBannderImg(mimetype, size, filename) {
        const stetament = `INSERT INTO bannerfile (mimetype, size, filename) VALUES (?,?,?)`
        const [result] = await connection.execute(stetament, [mimetype, size, filename])
        return result
    }
    async getAllBanner() {
        const statement = `SELECT filename FROM bannerfile`
        const [result] = await connection.execute(statement)
        return result
    }
    async remove(bannerId) {
        const statement = `DELETE FROM bannerfile WHERE id = ?`
        const [result] = await connection.execute(statement, [bannerId])
        return result
    }
}

module.exports = new BannderService()