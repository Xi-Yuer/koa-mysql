const SelectMomentFragment = () => {
  const statement = `
    SELECT 
      m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
      JSON_OBJECT('id',u.id,'name',u.name) author,
      IF(
        COUNT(c.id) ,
        JSON_ARRAYAGG(
          JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,'user', JSON_OBJECT('id',cu.id,'name',cu.name))
        ), 
        NULL) comments,
      IF(
        COUNT(l.id),
        JSON_ARRAYAGG(
          JSON_OBJECT('id',l.id,'name',l.name)
        ) ,
        NULL
      ) labels
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LEFT JOIN comment c ON c.moment_id = m.id
    LEFT JOIN users cu ON c.user_id = cu.id
    LEFT JOIN moment_label ml ON m.id = ml.moment_id
    LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id = ?
    GROUP BY m.id
    `;
  return statement;
};

module.exports = {
  SelectMomentFragment,
};
