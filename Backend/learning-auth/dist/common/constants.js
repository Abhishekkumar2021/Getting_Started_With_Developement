"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_HEADER = exports.AUTHORIZATION_PREFIX = exports.HttpStatus = void 0;
class HttpStatus {
}
exports.HttpStatus = HttpStatus;
HttpStatus.OK = 200;
HttpStatus.CREATED = 201;
HttpStatus.BAD_REQUEST = 400;
HttpStatus.UNAUTHORIZED = 401;
HttpStatus.FORBIDDEN = 403;
HttpStatus.NOT_FOUND = 404;
HttpStatus.INTERNAL_SERVER_ERROR = 500;
HttpStatus.CONFLICT = 409;
exports.AUTHORIZATION_PREFIX = "Bearer ";
exports.JWT_HEADER = {
    alg: "HS256",
    typ: "JWT"
};
