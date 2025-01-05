import express, { Express } from "express"
import userRouter from "./routes/user.routes.js"
import articleRouter from "./routes/article.routes.js"

// Server object
const app: Express = express()

app.listen(8080, () => {
    console.log("Successfully started the server at http://loalhost:8080")
})

// Use the routers
app.use(userRouter)
app.use(articleRouter)