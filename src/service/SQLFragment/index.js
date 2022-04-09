const { APP_HOST,APP_PORT } = require('../../app/config')
const SelectMomentFragment = () => {
  const statement = `
  SELECT 
    m.id id,m.content content,m.likeCount,m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT( 'id', u.id,'name', u.name,'avatarUrl', u.avatar_url) author,
    IF(COUNT( l.id) ,JSON_ARRAYAGG(
    JSON_OBJECT( 'id', l.id, 'name', l.name))
    ,NULL) labels,
    (SELECT IF(COUNT( c.id ),JSON_ARRAYAGG(
    JSON_OBJECT('id', c.id,'content', c.content,'commentId', c.comment_id,'createTime', c.createAt,
    'user', JSON_OBJECT( 'id', cu.id,'name', cu.name,'avatarUrl', cu.avatar_url))
    ) , NULL) 
    FROM comment c 
    LEFT JOIN users cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
    (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LEFT JOIN moment_label ml ON m.id = ml.moment_id
    LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id = ?
    GROUP BY m.id ;
  
    `;
  return statement;
};

module.exports = {
  SelectMomentFragment,
};
