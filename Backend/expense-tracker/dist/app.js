import express from "express";
import expenseRouter from "./routes/expense.routes.js";
import summaryRouter from "./routes/summary.routes.js";
import bodyParser from "body-parser";
const app = express();
app.listen(8080, () => { console.log("✅ Succesfully started the server. You can access the server at http://localhost:8080"); });
app.use(bodyParser.json());
app.use("/expenses", expenseRouter);
app.use("/summary", summaryRouter);
