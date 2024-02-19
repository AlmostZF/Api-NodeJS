import { Application, Request, Response, } from "express";
import { VegetablesController } from "../../controllers/vegetables/vegetables-controller";
import cors from "cors";

export class VegetablesRoute{

    private vegetablesController: VegetablesController = new VegetablesController();

    public routes(app: Application): void{
        app.options('/vegetables', cors);
        app.get('/vegetables', cors(), async (req: Request, res: Response) => {
            this.vegetablesController.get(req, res);
        });
    }
}