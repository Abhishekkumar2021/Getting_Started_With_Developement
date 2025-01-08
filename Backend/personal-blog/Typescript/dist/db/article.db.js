import { readFileSync, writeFileSync } from "node:fs";
class ArticleDatabase {
    constructor() {
        this.ARTICLE_FILE_PATH = "/Users/abhishek/Dev/Akansha/Development/Backend/personal-blog/Typescript/src/db/articles.json";
        this.articles = [];
        // load the articles from the file
        this.loadArticles();
    }
    loadArticles() {
        const fileData = readFileSync(this.ARTICLE_FILE_PATH);
        const jsonString = fileData.toString();
        this.articles = JSON.parse(jsonString);
    }
    writeArticles() {
        const jsonString = JSON.stringify(this.articles);
        writeFileSync(this.ARTICLE_FILE_PATH, jsonString);
    }
}
