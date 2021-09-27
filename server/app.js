const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa-cors");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");

const app = new Koa();
const router = new Router();

router.post("/save-article", async (ctx, next) => {
  let res = { msg: "保存成功", code: 200 };
  const { content = "", dir = "", title = "新建文件" } = ctx.request.body;
  try {
    fs.writeFileSync(`docs/${dir.join("/")}/${title}.md`, content);
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
