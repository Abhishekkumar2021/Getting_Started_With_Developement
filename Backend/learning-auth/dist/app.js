"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const variables_1 = require("./config/variables");
const client_1 = __importDefault(require("./db/client"));
const logger_1 = __importDefault(require("./config/logger"));
const auth_1 = __importDefault(require("./routes/auth"));
const constants_1 = require("./common/constants");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const sensitive_1 = __importDefault(require("./routes/sensitive"));
const auth_2 = require("./middlewares/auth");
const server = (0, express_1.default)();
// Middleware
server.use(express_1.default.json());
server.use((0, cookie_parser_1.default)());
if (parseInt(variables_1.AUTH_JWT) == 0)
    server.use(auth_2.sessionAuthMiddleware);
else
    server.use(auth_2.jwtAuthMiddleware);
// Routes
server.use("/api/v1/auth", auth_1.default);
server.use("/api/v1/sensitive", sensitive_1.default);
// Health check endpoint
server.get("/health", (req, res) => {
    res.status(constants_1.HttpStatus.OK).json({
        message: "Server is up and running!"
    });
});
async function startServer(server) {
    try {
        await client_1.default.$connect();
        logger_1.default.info("Connected to DB");
        server.listen(variables_1.PORT, () => {
            logger_1.default.info(`Server started at port ${variables_1.PORT}`);
        });
    }
    catch (error) {
        logger_1.default.error("Failed to connect to DB!", error);
        process.exit(1);
    }
}
startServer(server);
