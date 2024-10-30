import { Response } from 'express';
import { response_status_codes } from './common.model';

export function successResponse(message:string, res:Response, data: any){
    res.status(response_status_codes.success).json({
        status: 'SUCCESS',
        message: message,
        data
    })
}
export function failureResponse(message:string, res:Response, data: any){
    res.status(response_status_codes.internal_server_error).json({
        status: 'FAILURE',
        message: message,
        data
    })
}
export function insufficientParamenters(message:string, res:Response, data: any){
    res.status(response_status_codes.bad_request).json({
        status: 'FAILURE',
        message: message,
        data: {}
    })
}
export function unauthorize(message:string, res:Response, data: any){
    res.status(response_status_codes.unauthorize).json({
        status: 'UNAUTHORIZED',
        message: message,
        data: {}
    })
}
export function created(message:string, res:Response, data: any){
    res.status(response_status_codes.created).json({
        status: 'CREATED',
        message: message,
        data: {}
    })
}