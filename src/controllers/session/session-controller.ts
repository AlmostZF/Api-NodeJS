import { error } from "console";
import { Request, Response } from 'express';
import SessionService from "../../shared/service/session/session-service";

export class SessionController{
    private sessionService = new SessionService();

    get(req: Request, res: Response){
        this.sessionService.get().then((result)=>{
            res.status(200).json({
                data: result
            });
        }).catch((error)=>{
            res.status(500).json({
                data: "error 500"
            });
        });
    }

    post(req:Request, res:Response){
        this.sessionService.post(req.params, req.body).then((result)=>{
            res.status(200).json({
                data: result
            })
        }).catch((error)=>{
            res.status(500).json({
                data: "error 500"
            });
        });
    }
    
    editUser(req: Request, res: Response){
        this.sessionService.editUser(req.params, req.body).then((result)=>{
            res.status(200).json({
                data: result
            });
        }).catch((error)=>{
            res.status(500).json({
                data: "error 500"
            });
        });
    }
    createUser(req: Request, res: Response){
        this.sessionService.createUser().then((result)=>{
            res.status(200).json({
                data: result
            });
        }).catch((error)=>{
            res.status(500).json({
                data: "error 500"
            });
        });
    }
    put(req: Request, res: Response){
        this.sessionService.put().then((result)=>{
            res.status(200).json({
                data: result
            });
        }).catch((error)=>{
            res.status(500).json({
                data: "error 500"
            });
        });
    }

    delete(req: Request, res: Response){
        this.sessionService.delete().then((result)=>{
            res.status(200).json({
                data: result
            })
        }).catch((error)=>{
            res.status(500).json({
                data: "error 500"
            });
        })
    }
    
}