import express from "express";
import cors from "cors"
import { redirect, shorten } from "./controllers/url.controller.js";
import { SERVER_PORT } from "./config/variables.js";
import client from "./db/client.js";

const app = express()

// Middleware
app.use(cors())

// Routes
// GET /: Home 
app.get("/", (req, res) => {
    res.json({
        message: "This is home route, use POST /shorten for shortening the url."
    })
})

// POST /shorten : Short the long URL
app.post("/shorten", shorten)

// GET /{id}: Redirect to long url corresponding to this id
app.get("/{id}", redirect)

// Bind the server to given PORT
app.listen(SERVER_PORT, async () => {
    console.log("Server started on PORT:", SERVER_PORT)

    try {
        await client.connect()
        console.log("Succesfully connect to DB!")
    } catch (error) {
        console.log("Error connecting to DB. Exiting...")
        process.exit(1)
    }
})
