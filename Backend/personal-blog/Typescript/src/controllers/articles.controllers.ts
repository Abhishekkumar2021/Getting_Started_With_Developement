import { Request, Response } from "express"
import { readFileSync, writeFileSync } from "node:fs"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { ArticleDatabase, SimpleArticle } from "../db/article.db.js"

const articleDb = new ArticleDatabase()

export function getAllArticles(req: Request, res: Response) {
    const articles = articleDb.getAllArticles()
    res.status(StatusCodes.OK)
    res.json({
        message: "Successfully fetched all articles",
        data: articles
    })
}

export function getArticleById(req: Request, res: Response) {
    const { id } = req.params
    const foundArticle = articleDb.getArticleById(parseInt(id))

    if (!foundArticle) {
        res.status(StatusCodes.NOT_FOUND)
        res.json({
            message: "Article with given ID is not found",
            statusCode: StatusCodes.NOT_FOUND
        })

        return;
    }

    res.status(StatusCodes.OK)
    res.json({
        message: "Succesfully fetched the article",
        data: foundArticle
    })
}

export function createArticle(req: Request, res: Response) {
    const body = req.body
    let maxId = articleDb.getMaxId()

    // Add new article to the array
    const newArticle: SimpleArticle = {
        id: maxId + 1,
        name: body.name
    }

    articleDb.createArticle(newArticle)
    res.status(StatusCodes.CREATED)
    res.json({
        message: "Successfully created the article",
        data: newArticle
    })
}

export function updateArticleById(req: Request, res: Response) {
    const { id } = req.params
    const body = req.body

   
    const foundArticle = articleDb.getArticleById(parseInt(id))
    
    if (!foundArticle) {
        res.status(StatusCodes.NOT_FOUND)
        res.json({
            message: "Article with given ID is not found",
            statusCode: StatusCodes.NOT_FOUND
        })
        
        return;
    }

    foundArticle.name = body.name
    articleDb.updateArticleById(parseInt(id), foundArticle)
    
    res.status(StatusCodes.OK)
    res.json({
        message: "Successfully updated the article",
        data: foundArticle
    })
}

export function deleteArticleById(req: Request, res: Response) {
    const { id } = req.params

    const deletedArticle = articleDb.getArticleById(parseInt(id))
    const deletedIdx = articleDb.deleteArticleById(parseInt(id))

    if (deletedIdx === -1) {
        res.status(StatusCodes.NOT_FOUND)
        res.json({
            message: "Article with given ID is not found",
            statusCode: StatusCodes.NOT_FOUND
        })

        return;
    }

    
    res.status(StatusCodes.OK)
    res.json({
        message: "Successfully deleted the article",
        data: deletedArticle
    })
}