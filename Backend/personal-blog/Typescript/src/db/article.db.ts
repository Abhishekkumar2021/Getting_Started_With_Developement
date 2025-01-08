import { readFileSync, writeFileSync } from "node:fs"

export type SimpleArticle = {
    id: number,
    name: string
}

export class ArticleDatabase{
    private readonly ARTICLE_FILE_PATH = "/Users/abhishek/Dev/Akansha/Development/Backend/personal-blog/Typescript/src/db/articles.json"
    articles: SimpleArticle[] = []

    constructor(){
        // load the articles from the file
        this.loadArticles()
    }

    loadArticles(){
        const fileData = readFileSync(this.ARTICLE_FILE_PATH)
        const jsonString = fileData.toString()
        this.articles = JSON.parse(jsonString)
    }

    writeArticles(){
        const jsonString = JSON.stringify(this.articles)
        writeFileSync(this.ARTICLE_FILE_PATH, jsonString)
    }

    getAllArticles(){
        return this.articles
    }

    getArticleById(id: number){
        return this.articles.find(article => article.id === id)
    }

    createArticle(article: SimpleArticle){
        this.articles.push(article)
        this.writeArticles()
    }

    updateArticleById(id: number, article: SimpleArticle){
        const index = this.articles.findIndex(article => article.id === id)
        if(index !== -1){
            this.articles[index] = article
            this.writeArticles()
        }

        return index
    }

    deleteArticleById(id: number){
        const index = this.articles.findIndex(article => article.id === id)
        if(index !== -1){
            this.articles.splice(index, 1)
            this.writeArticles()
        }

        return index
    }

    getMaxId(){
        let maxId = 0
        for (const article of this.articles) {
            if (article.id > maxId) {
                maxId = article.id
            }
        }

        return maxId
    }
}