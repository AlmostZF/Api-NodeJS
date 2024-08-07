import { Request, Response } from 'express';
import ProductService from './products.service';
import { failureResponse, successResponse } from '../common/common.service';

export class ProductController {

    private productService: ProductService = new ProductService();

    get(req: Request, res: Response) {
        this.productService.get().then((result) => {
            successResponse(result.message, res, result.data);
        }).catch(function (value) {
            failureResponse('Erro ao Buscar produtos:' + value, res, {user: false});
        });
    }

    // delete(req: Request, res: Response){
    //      this.productService.delete(req.params.id).then((result)=>{
    //         successResponse('Sucesso o deletar produtos', res, {result});
    //     }).catch(function (value) {
    //         failureResponse('Erro ao Buscar produtos:' + value, res, {user: false});
    //     });
    // }

    put(req: Request, res: Response){
        this.productService.put(req.body).then((result)=>{
            successResponse('Sucesso o editar produtos', res, {result});
        }).catch(function (value) {
            failureResponse('Erro ao editar produtos:' + value, res, {user: false});
        });
    }

    filter(req: Request, res: Response){
        this.productService.filter(req).then((result)=>{
            successResponse(result.message, res, result.data);
        }).catch(function (value) {
            failureResponse('Erro ao Buscar produtos:' + value, res, {user: false});
        });
    }
}