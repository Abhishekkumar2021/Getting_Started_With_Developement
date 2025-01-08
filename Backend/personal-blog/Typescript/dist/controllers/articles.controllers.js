import { StatusCodes } from "http-status-codes";
import { ArticleDatabase } from "../db/article.db.js";
const articleDb = new ArticleDatabase();
export function getAllArticles(req, res) {
    const articles = articleDb.getAllArticles();
    res.status(StatusCodes.OK);
    res.json({
        message: "Successfully fetched all articles",
        data: articles
    });
}
export function getArticleById(req, res) {
    const { id } = req.params;
    const foundArticle = articleDb.getArticleById(parseInt(id));
    if (!foundArticle) {
        res.status(StatusCodes.NOT_FOUND);
        res.json({
            message: "Article with given ID is not found",
            statusCode: StatusCodes.NOT_FOUND
        });
        return;
    }
    res.status(StatusCodes.OK);
    res.json({
        message: "Succesfully fetched the article",
        data: foundArticle
    });
}
export function createArticle(req, res) {
    const { authorId, title, content } = req.body;
    let maxId = articleDb.getMaxId();
    // Add new article to the array
    const newArticle = {
        id: maxId + 1,
        authorId: authorId,
        title: title,
        content: content,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    articleDb.createArticle(newArticle);
    res.status(StatusCodes.CREATED);
    res.json({
        message: "Successfully created the article",
        data: newArticle
    });
}
export function updateArticleById(req, res) {
    const { id } = req.params;
    const body = req.body;
    const foundArticle = articleDb.getArticleById(parseInt(id));
    if (!foundArticle) {
        res.status(StatusCodes.NOT_FOUND);
        res.json({
            message: "Article with given ID is not found",
            statusCode: StatusCodes.NOT_FOUND
        });
        return;
    }
    const updatedArticle = Object.assign(Object.assign({}, foundArticle), body);
    updatedArticle.updatedAt = new Date();
    articleDb.updateArticleById(parseInt(id), updatedArticle);
    res.status(StatusCodes.OK);
    res.json({
        message: "Successfully updated the article",
        data: updatedArticle
    });
}
export function deleteArticleById(req, res) {
    const { id } = req.params;
    const deletedArticle = articleDb.getArticleById(parseInt(id));
    const deletedIdx = articleDb.deleteArticleById(parseInt(id));
    if (deletedIdx === -1) {
        res.status(StatusCodes.NOT_FOUND);
        res.json({
            message: "Article with given ID is not found",
            statusCode: StatusCodes.NOT_FOUND
        });
        return;
    }
    res.status(StatusCodes.OK);
    res.json({
        message: "Successfully deleted the article",
        data: deletedArticle
    });
}
