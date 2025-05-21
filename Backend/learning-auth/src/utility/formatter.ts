import { ZodError } from "zod";

export function formatZodError(error: ZodError) {
  return error.errors.map((err) => {
    const field = err.path.join('.'); // handles nested paths
    if (err.code === "invalid_type" && err.received === "undefined") {
      return `${capitalize(field)} is required.`;
    } else if (err.code === "too_small" && err.type === "string") {
      return `${capitalize(field)} must be at least ${err.minimum} characters long.`;
    } else {
      return `${capitalize(field)}: ${err.message}`;
    }
  })
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}