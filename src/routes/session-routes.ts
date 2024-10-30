import { Application } from 'express';

import cors from 'cors';
import { Request, Response } from 'express';
import { AuthMiddleware } from '../shared/middleware/authMiddleware';
import { SessionController } from '../modules/session/session.controller';
export class SessionRoute{

    private sessionController: SessionController = new SessionController();
    private middlewares: AuthMiddleware = new AuthMiddleware();

    public routes(app: Application){

        app.options('/createUser',  cors);
        app.post('/users/createUser', cors(), async (req: Request, res: Response) => {
            this.sessionController.createUser(req, res);
        })

        app.options('/login', cors);
        app.post('/login',cors(), async(req: Request, res: Response)=>{
            this.sessionController.post(req, res);
        })
        
        app.options('/refresh-token', cors);
        app.post('/refresh-token', cors(), async( req: Request, res: Response)=>{
            this.sessionController.refreshToken(req, res);
        })
    
    }
};