const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa-cors");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
const moment = require("moment");
const app = new Koa();
const router = new Router();
let meta = "";
const format = (d) => moment(d).utcOffset(0).format("YYYY-MM-DD");
router.post("/save-article", async (ctx, next) => {
  let res = { msg: "保存成功", code: 200 };
  const { content = "", dir = [], title = "新建文件" } = ctx.request.body;
  // dir = dir[]
  try {
    meta = `---
title: ${title}
categories:
  - ${dir.join("\n  - ")}
ctime: ${format(new Date())}
---
`;
    fs.writeFileSync(`docs/${dir.join("/")}/${title}.md`, meta + content);
  } catch (err) {
    console.log("[ err ] >", err);
    res = err;
  }
  ctx.response.body = res;
});

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8080);
