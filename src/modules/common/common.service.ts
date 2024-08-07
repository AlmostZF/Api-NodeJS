import { Response } from 'express';
import { response_status_codes } from './common.model';

export function successResponse(message:string, res:Response, DATA: any){
    res.status(response_status_codes.success).json({
        STATUS: 'SUCCESS',
        MESSAGE: message,
        DATA
    })
}
export function failureResponse(message:string, res:Response, DATA: any){
    res.status(response_status_codes.internal_server_error).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA
    })
}
export function insufficientParamenters(message:string, res:Response, DATA: any){
    res.status(response_status_codes.bad_request).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA: {}
    })
}
export function unauthorize(message:string, res:Response, DATA: any){
    res.status(response_status_codes.bad_request).json({
        STATUS: 'UNAUTHORIZED',
        MESSAGE: message,
        DATA: {}
    })
}