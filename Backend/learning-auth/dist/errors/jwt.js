"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTError = void 0;
class JWTError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.JWTError = JWTError;
