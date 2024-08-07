import { Login, SignIn  } from './../session/Dtos/sessionDTO';
import { TokenUtils } from "../../shared/utils/tokenUtils";
import { AuthLogin } from "../../shared/utils/authUtils";
import { TokenDTO } from "../tokenDTO";
import { Result } from "../../Dtos/result";
import { SessionProvider } from "../session/sessionProvider";


export default class SessionService{

    SessionProvider: SessionProvider = new SessionProvider()
    private tableName: string = 'usersLogin';

    async get(){
        return  "get";
    }

    async post(req:any, body:Login): Promise<Result>{
        try {
            const user = await this.SessionProvider.login(body.email);
            if(user.length === 0) {
                return this.creatResult( "login failed");
            } 

            const passwordHash = await AuthLogin.compareHash(body.password, user[0].password);
            if (!passwordHash) {
                return this.creatResult( "login failed");
            }

            const token: TokenDTO = TokenUtils.createToken(user[0].idUser);
            return this.creatResult( "login success", token);

        } catch (error) {
            console.error('Erro ao processar solicitação:', error);
            return this.creatResult( "Internal server error");
        }
            
    }
    
    private creatResult( message: string, data?:any): Result{
        const result: Result = {
            message: message,
            data
        }
        return result;
    }
    
    async put(){
        return  "put";
    }

    async createUser(req: any, body:SignIn): Promise<Result>{
        try{
            const isUserExisting = await this.SessionProvider.verifyUserExist(body.email);
            if(isUserExisting === true) {
                return this.creatResult("user already exists");
            }

            body.password = await AuthLogin.createHash(body.password);
            await this.SessionProvider.signUp(body);
            return this.creatResult( "user created");
        }catch(error: any){
            return this.creatResult( error.message);
        }
    }
    

    async refreshToken(req:any , body:any): Promise<Result>{
        const refreshToken = body.token;
        if(!refreshToken) {
            return this.creatResult( "Invalid refresh token");
        }
        
        try {
            const decoded = TokenUtils.createRefreshToken(1);
            return this.creatResult( "Token refreshed", decoded);
        } catch (error) {
            return this.creatResult( "Invalid refresh token");
        }
    }

};

