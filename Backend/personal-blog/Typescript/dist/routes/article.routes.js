import { Router } from "express";
import { getAllArticles, getArticleById, createArticle, updateArticleById, deleteArticleById, getArticlesByAuthorId } from "../controllers/articles.controllers.js";
// Created rouer object
const router = Router();
// All endpoints/route (Path + Method) here
// CRUD operations - Create, Read, Update, and Delete
// 1. GET /articles - Get all articles
router.get("/articles", getAllArticles);
// 2. GET /articles/authors/:id - Get all articles by author ID
router.get("/articles/authors/:id", getArticlesByAuthorId);
// 3. GET /articles/<id>, Ex: /articles/2, /articles/13 - Get article by ID id: 13
router.get("/articles/:id", getArticleById);
// 4. POST /articles - Create a new article
router.post("/articles", createArticle);
// 5. PATCH /articles/<id> - Update the article by ID
router.patch("/articles/:id", updateArticleById);
// 6. DELETE /articles/<id> - Delete article by ID
router.delete("/articles/:id", deleteArticleById);
export default router;
