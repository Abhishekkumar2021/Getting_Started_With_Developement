"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authRouter = (0, express_1.Router)();
// register
authRouter.post("/register", auth_1.registerUser);
// login
authRouter.post("/login", auth_1.loginUser);
// refresh access token
authRouter.post("/refresh-token", auth_1.refreshAccesToken);
exports.default = authRouter;
