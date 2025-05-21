"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = getCurrentUser;
const client_1 = __importDefault(require("../db/client"));
const constants_1 = require("../common/constants");
async function getCurrentUser(req, res) {
    const userId = req.userId;
    const user = await client_1.default.user.findFirst({
        where: {
            id: userId
        },
        omit: {
            password: true
        }
    });
    res.status(constants_1.HttpStatus.OK).json({
        message: "User fetched succesfully",
        user: user
    });
}
