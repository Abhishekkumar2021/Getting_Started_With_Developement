class SuccessResponse {
    constructor(
        public data: Object | null,
        public status: number,
        public message?: string,
    ) {
    }
}

export default SuccessResponse;