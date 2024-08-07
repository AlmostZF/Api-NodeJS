import { verify, sign, TokenExpiredError }  from 'jsonwebtoken';
import { secretKey, secretKeyRefresh } from '../../../environment';
import { TokenDTO, RefreshTokenDTO } from "../../modules/tokenDTO";

export class TokenUtils{

    static createToken(idUser: number): TokenDTO {
        const token: string  = sign({idUser: idUser}, secretKey, {expiresIn: 10})
        return new TokenDTO(token, true);
    }

    static createRefreshToken(idUser: number): RefreshTokenDTO {
        const refreshToken: string = sign({idUser: idUser}, secretKeyRefresh, {expiresIn: 60});
        return new RefreshTokenDTO(refreshToken, true);
    } 

    static verifyToken(token: string, refreshToken:string): TokenDTO {
        verify(token, secretKey, (err:any, decoded: any) => {
            if(err){
                if(err as TokenExpiredError){
                    this.verifyRefreshToken(refreshToken);
                }
            }
            return new TokenDTO(token, true);
        });
        return new TokenDTO("", false);
    }

    static verifyRefreshToken(refreshToken: string): RefreshTokenDTO {
        verify(refreshToken, secretKeyRefresh, (err:any, decoded: any) => {
            if(err){
                if(err as TokenExpiredError){
                    this.verifyRefreshToken(refreshToken);
                }
            }
            return new RefreshTokenDTO(refreshToken, true);
        });
        return new RefreshTokenDTO("", false);
    }

    static generateTokenAndRefereshToken(idUser: number): [TokenDTO, RefreshTokenDTO] {
        const token =  this.createToken(idUser);
        const refreshToken = this.createRefreshToken(idUser);
        return [token, refreshToken]
    }
}