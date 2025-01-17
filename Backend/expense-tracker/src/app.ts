import express from "express"
import expenseRouter from "./routes/expense.routes.js"
import summaryRouter from "./routes/summary.routes.js"
import bodyParser from "body-parser"

// Server Object
const app = express()

// Start the Server
app.listen(8080, () => { console.log("✅ Succesfully started the server. You can access the server at http://localhost:8080") })

// Middlewares
app.use(bodyParser.json())

// Routes
app.use("/expenses", expenseRouter)
app.use("/summary", summaryRouter)