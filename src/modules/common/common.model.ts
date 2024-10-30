export enum response_status_codes {
    success = 200,
    bad_request = 400,
    unauthorize = 401,
    internal_server_error = 500,
    created = 201,
}   
export class CustomError extends Error {
    constructor(message: string) {
        super(message);
      }
}