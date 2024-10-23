
import { Application, Request, Response, } from "express";
import cors from "cors";
import { ProductController } from "../modules/products/products.controller";

export class ProductsRoute{

    private productController: ProductController = new ProductController();

    public routes(app: Application){

        app.options('/products', cors);
        app.get('/products', cors(), async (req: Request, res: Response) => {
            this.productController.get(req, res);
        });
        
        // app.options('/vegetables', cors);
        // app.delete('/vegetables/:id', cors(), async (req: Request, res: Response) =>{
        //     this.productController.delete(req, res);
        // })

        app.options('/products', cors);
        app.get('/products/filtro', cors(), async (req: Request, res: Response) =>{
            this.productController.filter(req, res);
        })

        app.options('/products', cors);
        app.put('/products',cors(), async (req: Request, res: Response)=>{
            this.productController.put(req, res)
        })
    }
}