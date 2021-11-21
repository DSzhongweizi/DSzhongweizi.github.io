import("./mongodb/index.js")  //连接数据库
import Koa from "koa"
import cors from "koa-cors"
import bodyParser from "koa-bodyparser"
import moment from "moment"
import apis from "./router/index.js"
const app = new Koa();
const format = (d) => moment(d).utcOffset(0).format("YYYY-MM-DD");
Object.keys(apis).forEach(router => app.use(bodyParser()).use(apis[router].routes()).use(apis[router].allowedMethods()))
app
  .use(cors())
  .listen(3001);

