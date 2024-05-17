import { Application, Request, Response, } from "express";
import { VegetablesController } from "../controllers/vegetables.controller";
import cors from "cors";

export class VegetablesRoute{

    private vegetablesController: VegetablesController = new VegetablesController();

    public routes(app: Application){

        app.options('/vegetables', cors);
        app.get('/vegetables', cors(), async (req: Request, res: Response) => {
            this.vegetablesController.get(req, res);
        });
        
        
        app.options('/vegetables', cors);
        app.delete('/vegetables/:id', cors(), async (req: Request, res: Response) =>{
            this.vegetablesController.delete(req, res);
        })

        app.options('/vegetables', cors);
        app.post('/vegetables/', cors(), async (req: Request, res: Response) =>{
            this.vegetablesController.post(req, res);
        })

        app.options('/vegetables', cors);
        app.put('/vegetables/:id',cors(), async (req: Request, res: Response)=>{
            this.vegetablesController.put(req, res)
        })
    }
}