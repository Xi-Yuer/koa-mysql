const { getLabelByName, create } = require("../../service/label");
const verifyLabelsExists = async (ctx, next) => {
  // 取出要添加的标签
  const { labels } = ctx.request.body;
  // 判断每个标签是否存在
  const newLabels = [];
  for (let name of labels) {
    const labelResult = await getLabelByName(name);
    const label = { name };
    if (!labelResult) {
      // 不存在，创建
      const result = await create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label);
  }
  ctx.labels = newLabels;

  await next();
};
module.exports = {
  verifyLabelsExists,
};
