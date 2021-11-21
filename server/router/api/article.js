
import Router from "koa-router"
import articleController from "../../mongodb/controllers/article.js"
const router = new Router()
// 新增文章
router.post('/add-article', async (ctx, next) => await articleController.createArticle(ctx.request.body)
  .then(res => ctx.response.body = { id: res._id, status: 200, msg: "新增成功" })
  .catch(err => ctx.response.body = err)
);
// router.get('/article/list', articleController.getarticle);
// router.delete('/article/delete/:id', articleController.deletearticle);

export default router