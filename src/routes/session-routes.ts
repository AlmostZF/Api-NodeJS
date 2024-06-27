import { Application } from 'express';
import { SessionController } from '../controllers/session.controller';
import cors from 'cors';
import { Request, Response } from 'express';
import { AuthMiddleware } from '../shared/middleware/authMiddleware';
export class SessionRoute{

    private sessionController: SessionController = new SessionController();
    private middlewares: AuthMiddleware = new AuthMiddleware();

    public routes(app: Application){

        app.options('/Users', cors);
        app.get('/Users', cors(), async (req: Request, res: Response) => {
            this.middlewares.authenticationToke;
            this.sessionController.get(req, res);
        })

        app.options('/users', cors);
        app.post('/users/editUser/:id', cors(), async (req: Request, res: Response) => {
            this.sessionController.editUser(req, res);
        })

        app.options('/createUser',  cors);
        app.post('/users/createUser',this.middlewares.authenticationToke, cors(), async (req: Request, res: Response) => {
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
        
        app.options('/login',cors);
        app.delete('/users/deleUser',cors(), async(req: Request, res: Response)=>{
            this.sessionController.delete(req, res);
        })
    }
};