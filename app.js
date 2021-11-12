const cloudbase = require("@cloudbase/node-sdk");
const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa-cors");
const bodyParser = require("koa-bodyparser");
const moment = require("moment");
const app = new Koa();
const router = new Router();
const db = cloudbase.init({ env: "blog-3g2xa95s63836ce2" }).database()

exports.main = async (event, context) => {
  return db.collection("todos").get();
};


router.post("/save-article", async (ctx, next) => {
  let res = { msg: "保存成功", code: 200 };
  const { content = "", dir = [], title = "新建文件" } = ctx.request.body;
  db.collection("articles").add({
    title, categories, content,
    ctime: moment(new Date()).utcOffset(0).format("YYYY-MM-DD"),
  }).then(result => res = result).catch(err => res = err)
  ctx.response.body = res;
});

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8080);

module.exports = app
