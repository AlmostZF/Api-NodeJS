import { Request, Response } from 'express';
import VegetableService from '../shared/service/vegetables.service';

export class VegetablesController {
    // static vegetables = vegetables;
    private vegetablesService: VegetableService = new VegetableService();
    get(req: Request, res: Response) {
        this.vegetablesService.get().then((result) => {
                res.status(200).send({
                    data: {result}
                });
        }).catch((error) => {
            res.status(500).send({
                data: "error 500"
            })
        });
    }

    delete(req: Request, res: Response){
         this.vegetablesService.delete(req.params.id).then((result)=>{
            res.status(200).send({
                data: result
            });
            console.log(result)
        }).catch((error)=>{
            res.status(500).send({
                data: error
            });
         });
    }
    put(req: Request, res: Response){
        this.vegetablesService.put(req.params.id, req.body).then((result)=>{
            res.status(200).send({
                data: result
            });
        }).catch((error)=>{
            res.status(500).send({
                data: error
            });
        })
    }
    post(req: Request, res: Response){
        res.status(200).send({
            data: 'teste2'
        });
    }
}