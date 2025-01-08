import { readFileSync, writeFileSync } from "node:fs"
import Article from "../models/article.js"

export class ArticleDatabase {
    private readonly ARTICLE_FILE_PATH = "/Users/abhishek/Dev/Akansha/Development/Backend/personal-blog/Typescript/src/db/articles.json"
    articles: Article[] = []

    constructor() {
        // load the articles from the file
        this.loadArticles()
    }

    loadArticles() {
        const fileData = readFileSync(this.ARTICLE_FILE_PATH)
        const jsonString = fileData.toString()

        if (jsonString !== "") this.articles = JSON.parse(jsonString)

        for (const article of this.articles) {
            article.createdAt = new Date(article.createdAt)
            article.updatedAt = new Date(article.updatedAt)
        }
    }

    writeArticles() {
        const jsonString = JSON.stringify(this.articles)
        writeFileSync(this.ARTICLE_FILE_PATH, jsonString)
    }

    getAllArticles() {
        return this.articles
    }

    getArticleById(id: number) {
        return this.articles.find(article => article.id === id)
    }

    createArticle(article: Article) {
        this.articles.push(article)
        this.writeArticles()
    }

    updateArticleById(id: number, article: Article) {
        const index = this.articles.findIndex(article => article.id === id)
        if (index !== -1) {
            this.articles[index] = article
            this.writeArticles()
        }

        return index
    }

    deleteArticleById(id: number) {
        const index = this.articles.findIndex(article => article.id === id)
        if (index !== -1) {
            this.articles.splice(index, 1)
            this.writeArticles()
        }

        return index
    }

    getMaxId() {
        let maxId = 0
        for (const article of this.articles) {
            if (article.id > maxId) {
                maxId = article.id
            }
        }

        return maxId
    }

    getArticlesByAuthorId(authorId: number) {
        return this.articles.filter(article => article.authorId === authorId)
    }
}