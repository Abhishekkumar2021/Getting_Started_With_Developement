"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sensitive_1 = require("../controllers/sensitive");
const sensitiveRouter = (0, express_1.Router)();
sensitiveRouter.get("/me", sensitive_1.getCurrentUser);
exports.default = sensitiveRouter;
