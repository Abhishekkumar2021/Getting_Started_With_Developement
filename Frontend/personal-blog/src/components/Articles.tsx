import { useState } from "react"
import { useNavigate } from "react-router"
import "../styles/Article.css"
import { Article } from "../types/Article"
import ArticleCard from "./ArticleCard"

export default function Articles() {
    const [articles, setArticles] = useState<Article[]>([])

    const navigate = useNavigate()
    async function fetchArticles() {
        const BASE_URL = "http://localhost:8080"
        try {
            const response = await fetch(`${BASE_URL}/articles`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (response.status == 401) {
                navigate("/login")
                return;
            }

            const { message, data } = await response.json();
            console.log(message)
            setArticles(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="articles">
            <h1>All articles</h1>
            <button onClick={fetchArticles}>Fetch articles</button>
            <h1>Number of articles: {articles.length}</h1>
            {
                articles.map((article, idx) => {
                    return <ArticleCard key={idx} article={article}/>
                })
            }
        </div>
    )
}