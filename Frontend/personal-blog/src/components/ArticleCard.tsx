import {Article} from "../types/Article"

export default function ArticleCard({article}: {article: Article}){
    return (
        <div className="article-card">
            <h1>{article.title}</h1>
        </div>
    )
}