import Article from "../model/article.js"
// 新建文章
const createArticle = data => Article.create(data)

// 更新文章
const updateArticle = data => Article.findByIdAndUpdate(data._id, data, { new: true });

// 查询文章
const queryArticle = data => Article.find(data)

export default { createArticle, updateArticle, queryArticle }