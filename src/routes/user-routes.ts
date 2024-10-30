import { Application } from 'express';

import cors from 'cors';
import { Request, Response } from 'express';
import { AuthMiddleware } from '../shared/middleware/authMiddleware';
import { UserController } from '../modules/users/user.controller';
export class UserRoutes{

    private userController: UserController = new UserController();
    private middlewares: AuthMiddleware = new AuthMiddleware();

    public routes(app: Application){

        app.options('/Users', cors);
        app.get('/Users', cors(), async (req: Request, res: Response) => {
            this.middlewares.authenticationToke;
            this.userController.get(req, res);
        })

        app.options('/users', cors);
        app.post('/users/editUser/:id', cors(), async (req: Request, res: Response) => {
            this.userController.editUser(req, res);
        })
        
        app.options('/refresh-token', cors);
        app.post('/refresh-token', cors(), async( req: Request, res: Response)=>{
            this.userController.refreshToken(req, res);
        })
        
        app.options('/login',cors);
        app.delete('/users/deleUser',cors(), async(req: Request, res: Response)=>{
            this.userController.delete(req, res);
        })
    }
};