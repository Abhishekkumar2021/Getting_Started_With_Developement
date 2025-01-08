import { readFileSync, writeFileSync } from "node:fs";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
const ARTICLE_FILE_PATH = "/Users/abhishek/Dev/Akansha/Development/Backend/personal-blog/Typescript/src/db/articles.json";
export function getAllArticles(req, res) {
    try {
        const fileData = readFileSync(ARTICLE_FILE_PATH);
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
        const fileData = readFileSync(ARTICLE_FILE_PATH);
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
    // Load data from file
    const fileData = readFileSync(ARTICLE_FILE_PATH);
    const jsonString = fileData.toString();
    const articles = JSON.parse(jsonString);
    let maxId = 0;
    for (const article of articles) {
        if (article.id > maxId) {
            maxId = article.id;
        }
    }
    // Add new article to the array
    const newArticle = {
        id: maxId + 1,
        name: body.name
    };
    articles.push(newArticle);
    // Write the new array back to the file
    const articlesString = JSON.stringify(articles);
    writeFileSync(ARTICLE_FILE_PATH, articlesString);
    res.status(StatusCodes.CREATED);
    res.json({
        message: "Successfully created the article",
        data: newArticle
    });
}
export function updateArticleById(req, res) {
    const { id } = req.params;
    const body = req.body;
    // Load data from file
    const fileData = readFileSync(ARTICLE_FILE_PATH);
    const jsonString = fileData.toString();
    const articles = JSON.parse(jsonString);
    const foundIndex = articles.findIndex((article) => article.id === parseInt(id));
    if (foundIndex === -1) {
        res.status(StatusCodes.NOT_FOUND);
        res.json({
            message: "Article with given ID is not found",
            statusCode: StatusCodes.NOT_FOUND
        });
        return;
    }
    articles[foundIndex].name = body.name;
    // Write the new array back to the file
    const articlesString = JSON.stringify(articles);
    writeFileSync(ARTICLE_FILE_PATH, articlesString);
    res.status(StatusCodes.OK);
    res.json({
        message: "Successfully updated the article",
        data: articles[foundIndex]
    });
}
export function deleteArticleById(req, res) {
    const { id } = req.params;
    // Load data from file
    const fileData = readFileSync(ARTICLE_FILE_PATH);
    const jsonString = fileData.toString();
    const articles = JSON.parse(jsonString);
    const foundIndex = articles.findIndex((article) => article.id === parseInt(id));
    if (foundIndex === -1) {
        res.status(StatusCodes.NOT_FOUND);
        res.json({
            message: "Article with given ID is not found",
            statusCode: StatusCodes.NOT_FOUND
        });
        return;
    }
    const deletedArticle = articles[foundIndex];
    articles.splice(foundIndex, 1);
    // Write the new array back to the file
    const articlesString = JSON.stringify(articles);
    writeFileSync(ARTICLE_FILE_PATH, articlesString);
    res.status(StatusCodes.OK);
    res.json({
        message: "Successfully deleted the article",
        data: deletedArticle
    });
}
