
import  { Request, Response } from 'express';
import { failureResponse, successResponse } from '../common/common.service';
import UserService from './user.service';

export class UserController{
    private UserService: UserService = new UserService();

    get(req: Request, res: Response){
        this.UserService.get().then((result)=>{
            successResponse('Sucesso o buscar Usuários', res, result);
        }).catch(function (value) {
            failureResponse('Erro ao Buscar Usuário:' + value, res, {user: false});
        });
    }
    
    editUser(req: Request, res: Response){
        this.UserService.editUser(req.params, req.body).then((result)=>{
            successResponse(result.message, res, result.data);
        }).catch(function (value) {
            failureResponse('Erro ao editar Usuário:' + value, res, {user: false});
        });
    }

    put(req: Request, res: Response){
        this.UserService.put().then((result)=>{
            successResponse('Sucesso ao editar Usuários', res, result);
        }).catch(function (value) {
            failureResponse('Erro ao editar Usuário:' + value, res, {user: false});
        });
    }

    delete(req: Request, res: Response){
        this.UserService.delete(req.params, req.body).then((result)=>{
            successResponse(result.message, res, result.data);
        }).catch(function (value) {
            failureResponse('Erro ao deletar Usuário:' + value, res, {user: false});
        });
    }
    
    refreshToken(req: Request, res: Response){
        this.UserService.refreshToken(req.params, req.body).then((result)=>{
            successResponse(result.message, res, result.data);
        }).catch(function (value) {
            failureResponse('Erro' + value, res, {user: false});
        });
    }
}