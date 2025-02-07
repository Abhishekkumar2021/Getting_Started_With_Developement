class SuccessResponse {
    data;
    status;
    message;
    constructor(data, status, message) {
        this.data = data;
        this.status = status;
        this.message = message;
    }
}
export default SuccessResponse;
