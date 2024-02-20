import { Application } from 'express';
import { SessionController } from './../../controllers/session/session-controller';
import cors from 'cors';
import { Request, Response } from 'express';
export class SessionRoute{

    private sessionController: SessionController = new SessionController();

    public routes(app: Application){

        app.options('/Users', cors);
        app.get('/Users', cors(), async (req: Request, res: Response) => {
            this.sessionController.get(req, res);
        })

        app.options('/users', cors);
        app.post('/users/editUser/:id', cors(), async (req: Request, res: Response) => {
            this.sessionController.editUser(req, res);
        })

        app.options('/createUser', cors);
        app.post('/createUser', cors(), async (req: Request, res: Response) => {
            this.sessionController.createUser(req, res);
        })

        app.options('/login', cors);
        app.post('/login',cors(), async(req: Request, res: Response)=>{
            this.sessionController.post(req, res);
        })
        
        app.options('/login',cors);
        app.delete('/users/deleUser/:id',cors(), async(req: Request, res: Response)=>{
            this.sessionController.delete(req, res);
        })
    }
};