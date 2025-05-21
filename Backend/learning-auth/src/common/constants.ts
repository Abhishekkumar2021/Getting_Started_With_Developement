export class HttpStatus {
    public static OK = 200
    public static CREATED = 201
    public static BAD_REQUEST = 400
    public static UNAUTHORIZED = 401
    public static FORBIDDEN = 403
    public static NOT_FOUND = 404
    public static INTERNAL_SERVER_ERROR = 500
    public static CONFLICT = 409
}

export const AUTHORIZATION_PREFIX = "Bearer "

export const JWT_HEADER = {
  alg: "HS256",
  typ: "JWT"
}
