import { Request, Response } from 'express';

const vegetables = require('../../database/vegetables.json');

export class VegetablesController {
    // static vegetables = vegetables;

    get(req: Request, res: Response) {
        if(res.status(200)){
            res.status(200).send({
                title: {vegetables}
            });
        }else{
            res.status(500).send({
                title: "error 500"
            })
        }
    }
}