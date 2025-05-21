"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodError = formatZodError;
function formatZodError(error) {
    return error.errors.map((err) => {
        const field = err.path.join('.'); // handles nested paths
        if (err.code === "invalid_type" && err.received === "undefined") {
            return `${capitalize(field)} is required.`;
        }
        else if (err.code === "too_small" && err.type === "string") {
            return `${capitalize(field)} must be at least ${err.minimum} characters long.`;
        }
        else {
            return `${capitalize(field)}: ${err.message}`;
        }
    });
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
