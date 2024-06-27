import { verify, sign, TokenExpiredError }  from 'jsonwebtoken';
import { secretKey, secretKeyRefresh } from '../../../environment';
import { Token } from '../../models/token';
import { error } from 'console';

export class TokenService{
    
    createToken(idUser: number): Token {
        const token: string  = sign({idUser: idUser}, secretKey, {expiresIn: 10})
        return {
            token: token,
            auth: true,
        }
    }; 

    refreshToken(idUser: number): Token {
        const refreshToken: string = sign({idUser: idUser}, secretKeyRefresh, {expiresIn: 60});
        return {
            token: refreshToken,
            auth: true,
        } 
    } 

    verifyToken(token: string, refreshToken:string): Token {
        verify(token, secretKey, (err:any, decoded: any) => {
            if(err){
                if(err as TokenExpiredError){
                    this.verifyRefreshToken(refreshToken);
                }
            }
            return {token: token, auth: true}
        });
        return {token: "",auth: false}
    }

    verifyRefreshToken(refreshToken: string): Token {
        verify(refreshToken, secretKeyRefresh, (err:any, decoded: any) => {
            if(err){
                if(err as TokenExpiredError){
                    this.verifyRefreshToken(refreshToken);
                }
            }
            return {token: refreshToken, auth: true}
        });
        return {token: "",auth: false}
    }

    generateToken(idUser: number): any {
        const token =  this.createToken(idUser);
        const refreshToken = this.refreshToken(idUser);
        return {
            token: token.token,
            refresh: refreshToken.token,
            auth: true,
        }
    }
}