const SelectMomentFragment = (otherSQL) => {
  const statement = `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name) author
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id 
    ${otherSQL}
    `;
  return statement;
};

module.exports = {
  SelectMomentFragment,
};
