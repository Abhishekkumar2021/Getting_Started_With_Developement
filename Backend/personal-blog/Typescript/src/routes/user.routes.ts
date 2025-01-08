import { Router } from "express"
import { getAllUsers, getUserById, createUser, updateUserById, deleteUserById } from "../controllers/users.controllers.js"

// Created rouer object
const router = Router()

// All endpoints/route (Path + Method) here
// CRUD operations - Create, Read, Update, and Delete

// 1. GET /users - Get all users
router.get("/users", getAllUsers)

// 2. GET /users/<id>, Ex: /users/2, /users/13 - Get user by ID id: 13
router.get("/users/:id", getUserById)

// 3. POST /users - Create a new user
router.post("/users", createUser)

// 4. PATCH /users/<id> - Update the user by ID
router.patch("/users/:id", updateUserById)

// 5. DELETE /users/<id> - Delete user by ID
router.delete("/users/:id", deleteUserById)

export default router