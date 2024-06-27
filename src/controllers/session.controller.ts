
import  { Request, Response } from 'express';
import SessionService from "../shared/service/session.service";

export class SessionController{
    private sessionService: SessionService = new SessionService();

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
        try{
            this.sessionService.post(req.params, req.body).then((result)=>{
                if (result.success) {
                    res.status(200).json(result);
                  } else {
                    res.status(401).json(result);
                  }
            }).catch((error)=>{
                res.status(500).json({
                    data: error,
                    data2: "error 500"
                });
            });
        }catch(error){
            console.error(error);
            res.status(500).json({
              success: false,
              message: "Internal server error"
            });
        }
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
        this.sessionService.createUser(req.params, req.body).then((result)=>{
            // console.log(req)
            // console.log(res)
            res.status(201).json({
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
        this.sessionService.delete(req.params, req.body).then((result)=>{
            res.status(200).json({
                data: result
            })
        }).catch((error)=>{
            res.status(500).json({
                data: "error 500"
            });
        })
    }
    
    refreshToken(req: Request, res: Response){
        this.sessionService.refreshToken(req.params, req.body).then((result)=>{
            res.status(200).json({
                data: result
            });
        }).catch((error)=>{
            res.status(500).json({
                data: "error 500"
            });
        });
    }
}