import { Request, Response } from 'express';
import ProductService from './products.service';
import { failureResponse, successResponse, insufficientParamenters} from '../common/common.service';
import { CustomError } from "../common/common.model"

export class ProductController {

    private productService: ProductService = new ProductService();

    get(req: Request, res: Response) {
        this.productService.get(req).then((result) => {
            successResponse(result.message, res, result.data);
        }).catch(function (error) {
            error instanceof CustomError
            ? insufficientParamenters('Falha ao buscar produtos: ' + error.message, res, {})
            : failureResponse('Erro ao buscar produtos: ' + error.message, res, {})
        });
    }

    // delete(req: Request, res: Response){
    //      this.productService.delete(req.params.id).then((result)=>{
    //         successResponse('Sucesso o deletar produtos', res, {result});
    //     }).catch(function (error) {
    //         failureResponse('Erro ao Buscar produtos:' + error.message, res, {user: false});
    //     });
    // }

    put(req: Request, res: Response){
        this.productService.put(req.body).then((result)=>{
            successResponse('Sucesso o editar produtos', res, {result});
        }).catch(function (error) {
            failureResponse('Erro ao editar produtos: ' + error.message, res, {user: false});
        });
    }

    filter(req: Request, res: Response){
        this.productService.filter(req).then((result)=>{
            successResponse(result.message, res, result.data);
        }).catch(function (error) {
            error instanceof CustomError
            ? insufficientParamenters('Falha ao buscar produtos: ' + error.message, res, {})
            : failureResponse('Erro ao buscar produtos: ' + error.message, res, {})
        });
    }

    getItemById(req: Request, res: Response){
        this.productService.getProductById(req).then((result)=>{
            successResponse(result.message, res, result.data);
        }).catch(function (error) {
            failureResponse('Erro ao buscar produto: ' + error.message, res, {});
        });
    }
}