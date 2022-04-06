const connection = require("../../app/database");
const doLike = async (tableName, Id, userId) => {
  const table = tableName === "comment" ? "c" : "m";
  const stetament = `SELECT * FROM ${table}_islike WHERE ${tableName}_id = ? AND user_id = ?`;
  const [result] = await connection.query(stetament, [Id, userId]);
  // 获取moment中的 likeCount 字段的值
  const getLikeCountStatement = `SELECT likeCount FROM ${tableName} WHERE id = ?`;
  const [likeCountResult] = await connection.query(getLikeCountStatement, [Id]);
  const likeCount = likeCountResult[0].likeCount;

  // islike === 1 ==> 已经点赞
  if (result.length !== 0) {
    // 取消点赞
    // 给 c_islike数据库中删除数据
    const Lstetament = `DELETE FROM ${table}_islike WHERE ${tableName}_id = ? AND user_id = ?`;
    const Lresult = await connection.execute(Lstetament, [Id, userId]);

    if (likeCount === 0) return 0;
    // 将 moment 数据库中的 likeCount 字段减一
    const Mstetament = `UPDATE ${tableName} SET likeCount = ? WHERE id = ?`;
    const Mresult = await connection.execute(Mstetament, [likeCount - 1, Id]);

    return 0;
  } else {
    // 点赞
    // 给 c_islike数据库中插入数据
    const Lstetament = `INSERT INTO ${table}_islike (${tableName}_id, user_id, islike) VALUES (?, ?, ?)`;
    const Lresult = await connection.execute(Lstetament, [Id, userId, 1]);

    // 将 moment 数据库中的 likeCount 字段加一
    const Mstetament = `UPDATE ${tableName} SET likeCount = ? WHERE id = ?`;
    const Mresult = await connection.execute(Mstetament, [likeCount + 1, Id]);

    return 1;
  }
};

// 给动态点赞👍
const like = (table) => {
  return async (ctx, next) => {
    // 获取参数
    const id = Object.values(ctx.params)[0];
    const { id: userId } = ctx.user;

    const result = await doLike(table, id, userId);

    if (!result) {
      ctx.body = {
        status: 0,
        message: "取消点赞",
      };
    } else {
      ctx.body = {
        status: 1,
        message: "点赞",
      };
    }
  };
};
const authIsDOLike =async (tableName, momentId, userId) => {
  const table = tableName === "comment" ? "c" : "m";
  const stetament = `SELECT * FROM ${table}_islike WHERE ${tableName}_id = ? AND user_id = ?`;
  const [result] = await connection.query(stetament, [momentId, userId]);
  return result;
}
// 查询用户是否为该动态点赞👍
const authIsLike = (tableName) => {
  return async(ctx, next) => {
    // 获取参数
    const id = Object.values(ctx.params)[0];
    const { id: userId } = ctx.user;
  
    const result = await authIsDOLike(tableName, id, userId);
  
    if (!result.length) {
      ctx.body = {
        status: 0,
        message: "未点赞",
      };
    } else {
      ctx.body = {
        status: 1,
        message: "已点赞",
      };
    }
}
}
module.exports = {
  doLike,
  like,
  authIsLike
};
