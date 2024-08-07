
import  { Request, Response } from 'express';
import SessionService from './session.service';
import { failureResponse, successResponse } from '../common/common.service';

export class SessionController{
    private sessionService: SessionService = new SessionService();

    get(req: Request, res: Response){
        this.sessionService.get().then((result)=>{
            successResponse('Sucesso o buscar Usuários', res, result);
        }).catch(function (value) {
            failureResponse('Erro ao Buscar Usuário:' + value, res, {user: false});
        });
    }

    post(req:Request, res:Response){
        try{
            this.sessionService.post(req.params, req.body).then((result)=>{
                if (result) {
                    successResponse(result.message, res, result.data);
                  } else {
                    failureResponse('Erro ao efetuar o login:', res, {user: false});
                  }
            }).catch(function (value) {
                failureResponse('Erro ao efetuar o login:' + value, res, {user: false});
            });
        }catch(error){
            failureResponse('Erro ao efetuar o login:' + error, res, {user: false});
        }
    }
    
    
    createUser(req: Request, res: Response){
        this.sessionService.createUser(req.params, req.body).then((result)=>{
            successResponse(result.message, res, result.data);
        }).catch(function (value) {
            failureResponse('Erro ao criar Usuário:' + value, res, {user: false});
        });
    }

    put(req: Request, res: Response){
        this.sessionService.put().then((result)=>{
            successResponse('Sucesso ao editar Usuários', res, result);
        }).catch(function (value) {
            failureResponse('Erro ao editar Usuário:' + value, res, {user: false});
        });
    }
    
    refreshToken(req: Request, res: Response){
        this.sessionService.refreshToken(req.params, req.body).then((result)=>{
            successResponse(result.message, res, result.data);
        }).catch(function (value) {
            failureResponse('Erro' + value, res, {user: false});
        });
    }
}