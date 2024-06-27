import { Request, Response } from 'express';
import ProductService from '../shared/service/products.service';

export class ProductController {

    private productService: ProductService = new ProductService();

    get(req: Request, res: Response) {
        this.productService.get().then((result) => {
                res.status(200).send({
                    data: result
                });
        }).catch((error) => {
            res.status(500).send({
                data: "error 500"
            })
        });
    }

    delete(req: Request, res: Response){
         this.productService.delete(req.params.id).then((result)=>{
            res.status(200).send({
                data: result
            });
        }).catch((error)=>{
            res.status(500).send({
                data: error
            });
         });
    }
    put(req: Request, res: Response){
        this.productService.put(req.body).then((result)=>{
            res.status(200).send({
                data: result
            });
        }).catch((error)=>{
            res.status(500).send({
                data: error
            });
        })
    }
    filter(req: Request, res: Response){
        this.productService.filter(req).then((result)=>{
            res.status(200).send({
                data: result
            });
        }).catch((error)=>{
            res.status(500).send({
                data: error
            });
        })
    }
}