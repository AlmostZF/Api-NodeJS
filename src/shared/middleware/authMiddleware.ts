import  Jwt, { TokenExpiredError, verify }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { secretKey, secretKeyRefresh } from '../../../environment';

export class AuthMiddleware {
    
    authenticationToke(req: Request, res:Response, next:NextFunction){
        let id: number = 0;
        const token = req.headers["x-access-token"] as string;
        const refreshToken = req.headers["x-refresh-token"] as string;
        if(!token) return res.status(401).send({auth: false, message: "no token provided"});
        verify(token, secretKey, (err:any, decoded: any) => {
            if (decoded && decoded.idUser !== undefined) {
                id = decoded.idUser;
                console.log("ID do usuário:", decoded.idUser);
            } else {
                console.log("Token inválido ou ausente");
            }
    
            if(err){
                if(err as TokenExpiredError){
                    verify(refreshToken, secretKeyRefresh, (err:any, decoded: any) => {
                        
                        if(err){
                            if(err as TokenExpiredError){
                                return res.status(401).send({auth: false, message: "invalid Refresh token"});
                            }
                            return res.status(401).send({auth: false, message: "invalid Refresh token"});
                        }else{
                            const newAccessToken = Jwt.sign({idUser: id}, secretKey, {expiresIn: 20});
                            // const newRefreshToken = Jwt.sign({id: decoded.id}, secretKeyRefresh, {expiresIn: '7d'});
                            res.setHeader("x-access-token", newAccessToken);
                            console.log("gerou outro TOKEN 1x");
                            // res.setHeader("x-refresh-token", newRefreshToken);
                           
                        }

                        next();
                    });
                }else{
                    return res.status(401).send({auth: false, message: "invalid token"})
                }
            }else{
                next();
            }
        });
    }


}