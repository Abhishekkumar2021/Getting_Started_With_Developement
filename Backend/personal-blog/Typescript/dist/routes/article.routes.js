import { Router } from "express";
import { getAllArticles, getArticleById, createArticle, updateArticleById, deleteArticleById } from "../controllers/articles.controllers.js";
// Created rouer object
const router = Router();
// All endpoints/route (Path + Method) here
// CRUD operations - Create, Read, Update, and Delete
// 1. GET /articles - Get all articles
router.get("/articles", getAllArticles);
// 2. GET /articles/<id>, Ex: /articles/2, /articles/13 - Get article by ID id: 13
router.get("/articles/:id", getArticleById);
// 3. POST /articles - Create a new article
router.post("/articles", createArticle);
// 4. PATCH /articles/<id> - Update the article by ID
router.patch("/articles/:id", updateArticleById);
// 5. DELETE /articles/<id> - Delete article by ID
router.delete("/articles/:id", deleteArticleById);
export default router;
