const like = async (tableName, Id, userId) => {
  const stetament = `SELECT * FROM c_islike WHERE ${tableName}_id = ? AND user_id = ?`;
  const [result] = await connection.query(stetament, [Id, userId]);

  // 获取moment中的 likeCount 字段的值
  const getLikeCountStatement = `SELECT likeCount FROM ${tableName} WHERE id = ?`
  const [ likeCountResult ] = await connection.query(getLikeCountStatement, [ Id ])
  const likeCount = likeCountResult[0].likeCount

  const table = tableName === 'comment' ? 'c' : 'm'

  // islike === 1 ==> 已经点赞
  if (result.length !== 0) {
    // 取消点赞
    // 给 c_islike数据库中删除数据
    const Lstetament = `DELETE FROM ${table}_islike WHERE ${tableName}_id = ? AND user_id = ?`;
    const Lresult = await connection.execute(Lstetament, [Id, userId]);

    if(likeCount === 0) return 0
    // 将 moment 数据库中的 likeCount 字段减一
    const Mstetament = `UPDATE ${tableName} SET likeCount = ? WHERE id = ?`
    const Mresult = await connection.execute(Mstetament,[ likeCount - 1, Id ])

    return 0
  } else {
    // 点赞
    // 给 c_islike数据库中插入数据
    const Lstetament = `INSERT INTO ${table}_islike (${tableName}_id, user_id, islike) VALUES (?, ?, ?)`;
    const Lresult = await connection.execute(Lstetament, [Id, userId, 1]);

    // 将 moment 数据库中的 likeCount 字段加一
    const Mstetament = `UPDATE ${tableName} SET likeCount = ? WHERE id = ?`
    const Mresult = await connection.execute(Mstetament,[ likeCount + 1, Id ])

    return 1
    
  }
}

const connection = require('./src/app/database')
const statement = `DELETE FROM users WHERE id = 15`
connection.execute(statement)
// SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ... 

// APP_PORT = 8005
// APP_HOST = http://112.124.28.77
// MYSQL_HOST = 112.124.28.77
// MYSQL_PORT = 3306
// MYSQL_DATABASE = coderchat
// MYSQL_ROOT = root
// MYSQL_PASSWORD = 2214380963Wx