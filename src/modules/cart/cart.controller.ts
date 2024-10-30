import CartService from "./cart.service"
import { Request, Response } from 'express';
import { created, failureResponse, successResponse } from '../common/common.service';

export class CartController{
    private cartService: CartService = new CartService();

    async getCart(req: Request, res: Response){
         this.cartService.getCart().then((result)=>{
            successResponse(result.message, res, result.data);
        }).catch(function (value) {
            failureResponse('Erro ao Buscar carrinho:' + value, res, {});
        });
    }
    async addItem(req: Request, res: Response){
         this.cartService.addItemToCart(req).then((result)=>{
            successResponse(result.message, res, result.data);
        }).catch(function (value) {
            failureResponse('Erro ao Buscar carrinho:' + value, res, {});
        });
    }

    async updateCart(req: Request, res: Response){
         this.cartService.updateCart().then((result)=>{
            successResponse(result.message, res, result.data);
        }).catch(function (value) {
            failureResponse('Erro ao Buscar carrinho:' + value, res, {});
        });
    }

    async deleteCartItens(req: Request, res: Response){
         this.cartService.deleteCartItens().then((result)=>{
            successResponse(result.message, res, result.data);
        }).catch(function (value) {
            failureResponse('Erro ao Buscar carrinho:' + value, res, {});
        });
    }
    
    async createCart(req: Request, res: Response){
         this.cartService.createCart(req).then((result) => {
            successResponse(result.message, res, result.data);
        }).catch(function (value) {
            failureResponse('Erro ao Buscar carrinho:' + value, res, {});
        });
    }
}