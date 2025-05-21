"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
// Default signature genration algorithm is HS256 -> HMAC + SHA256
const crypto_1 = __importDefault(require("crypto"));
const constants_1 = require("../common/constants");
const jwt_1 = require("../errors/jwt");
class JWT {
    static encode(payload, secretKey, expiration) {
        const headerJsonString = JSON.stringify(constants_1.JWT_HEADER);
        const base64EncodedHeader = Buffer.from(headerJsonString).toString('base64url');
        // Add exp claim to payload
        payload.exp = Date.now() + expiration;
        const payloadJsonString = JSON.stringify(payload);
        const base64EncodedPayload = Buffer.from(payloadJsonString, 'utf-8').toString('base64url');
        let token = `${base64EncodedHeader}.${base64EncodedPayload}`;
        // generate signature
        const signature = crypto_1.default.createHmac('sha256', secretKey).update(token).digest('base64url');
        token += `.${signature}`;
        return token;
    }
    static decode(token, secretKey) {
        const [encodedHeader, encodePayload, signature] = token.split('.');
        const payloadJsonString = Buffer.from(encodePayload, 'base64url').toString('utf-8');
        const decodedPayload = JSON.parse(payloadJsonString);
        // check expiration
        if (!decodedPayload.exp) {
            throw new jwt_1.JWTError("No expiration claim found");
        }
        if (Date.now() >= parseInt(decodedPayload.exp)) {
            throw new jwt_1.JWTError("Token expired");
        }
        // Signature verify
        const genratedSignature = crypto_1.default.createHmac('sha256', secretKey).update(`${encodedHeader}.${encodePayload}`).digest('base64url');
        if (signature !== genratedSignature) {
            throw new jwt_1.JWTError("Invalid token");
        }
        return decodedPayload;
    }
}
exports.JWT = JWT;
