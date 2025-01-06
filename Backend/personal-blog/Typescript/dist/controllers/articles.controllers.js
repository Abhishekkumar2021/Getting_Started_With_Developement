import { readFileSync } from "node:fs";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
export function getAllArticles(req, res) {
    try {
        const fileData = readFileSync("/Users/abhishek/Dev/Akansha/Development/Backend/personal-blog/Typescript/src/db/articles.json");
        const jsonString = fileData.toString();
        const articles = JSON.parse(jsonString);
        res.status(StatusCodes.OK);
        // res.setHeader("Content-Type", "application/json")
        // res.send(jsonString)
        // JSON string
        res.json({
            message: "Successfully fetched all articles",
            data: articles
        });
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        res.json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR
        });
    }
}
export function getArticleById(req, res) {
    const { id } = req.params;
    try {
        const fileData = readFileSync("/Users/abhishek/Dev/Akansha/Development/Backend/personal-blog/Typescript/src/db/articles.json");
        const jsonString = fileData.toString();
        const articles = JSON.parse(jsonString);
        const foundArticle = articles.find((article) => {
            return article.id === parseInt(id);
        });
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
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        res.json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR
        });
    }
}
export function createArticle(req, res) {
    const body = req.body;
    console.log(body);
    res.json({
        message: "I am sending you your sent data",
        data: body
    });
}
export function updateArticleById(req, res) {
    res.send("updateArticleById");
}
export function deleteArticleById(req, res) {
    res.send("deleteArticleById");
}
