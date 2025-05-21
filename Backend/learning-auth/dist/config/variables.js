"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET_KEY = exports.REFRESH_TOKEN_EXPIRATION = exports.ACCESS_TOKEN_EXPIRATION = exports.AUTH_JWT = exports.SESSION_EXPIRATION = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.PORT = _a.PORT, exports.SESSION_EXPIRATION = _a.SESSION_EXPIRATION, exports.AUTH_JWT = _a.AUTH_JWT, exports.ACCESS_TOKEN_EXPIRATION = _a.ACCESS_TOKEN_EXPIRATION, exports.REFRESH_TOKEN_EXPIRATION = _a.REFRESH_TOKEN_EXPIRATION, exports.JWT_SECRET_KEY = _a.JWT_SECRET_KEY;
