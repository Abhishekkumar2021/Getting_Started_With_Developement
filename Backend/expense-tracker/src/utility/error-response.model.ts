class ErrorResponse {
    constructor(
        public message: string,
        public status: number,
    ) {
    }
}

export default ErrorResponse;