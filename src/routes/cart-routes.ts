import { Application, Request, Response, } from "express";
import cors from "cors";
import { CartController } from './../modules/cart/cart.controller';

export class CartRoute{

    private cartController: CartController = new CartController();

    public routes(app: Application){

        app.options('/cart', cors);
        app.put('/cart', cors(), async (req: Request, res: Response) => {
            this.cartController.updateCart(req, res); // irá atualizar os itens do carrinho
        });
        
        app.options('/cart', cors);
        app.post('/cart', cors(), async (req: Request, res: Response) => {
            this.cartController.getCart(req, res); // irá pegar os dados do carrinho
        });
        
        app.options('/cart', cors);
        app.post('/cart/teste', cors(), async (req: Request, res: Response) => {
            this.cartController.createCart(req, res); // irá criar um carrinho novo (após a compra?)
        });
        
        app.options('/cart', cors);
        app.post('/cart/adicionar_item', cors(), async (req: Request, res: Response) => {
            this.cartController.addItem(req, res); // irá criar um carrinho novo (após a compra?)
        });

        app.options('/cart', cors);
        app.delete('/cart', cors(), async (req: Request, res: Response) => {
            this.cartController.deleteCartItens(req, res); // irá deletar os itens do carrinho 
            
        });
    }

}