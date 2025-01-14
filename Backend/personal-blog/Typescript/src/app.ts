import express, { Express } from "express"
import bodyParser from "body-parser"
import userRouter from "./routes/user.routes.js"
import articleRouter from "./routes/article.routes.js"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"

// Server object
const app: Express = express()

// Server start
app.listen(8080, () => {
    console.log("Successfully started the server at http://localhost:8080")
})

// JSON parsing middleware
app.use(bodyParser.json())

// CORS middleware
app.use(cors())

// Use the routers
app.use(userRouter)
app.use(articleRouter)
app.use(authRouter)