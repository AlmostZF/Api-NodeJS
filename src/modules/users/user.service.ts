
import { TokenUtils } from "../../shared/utils/tokenUtils";
import { Result } from "../../Dtos/result";
import { User } from "../../Dtos/user-model";
import { UserProvider } from "./userProvider";


export default class UserService{

    UserProvider: UserProvider = new UserProvider()
    private tableName: string = 'usersLogin';

    async get(){
        return  "get";
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

    async editUser(req:any, body:User): Promise<Result>{
        try{
            const user = await this.UserProvider.selectAllUsers(this.tableName);
            
            user.find((e:User)=> e.idUser === body.idUser)
            // this.passwordHash = await bcrypt.hash(body.password, 10);
            if(!user){
                return {
                    message:"user not found",
                    data: {}
                }
            }else{
                return {
                    data: user,
                    message: "user updated"
                }
            }
        } catch(error: any){
            return {
                message: error.message,
                data: {}
            }};
    }

    async delete(req:any , body:User): Promise<Result>{
        try{   
            const user = await this.UserProvider.selectAllUsers(this.tableName);
            const userFind = user.find((e:User)=> e.email === body.email)
            if(user){
                this.UserProvider.deleteUser(userFind.idUser, this.tableName);
                // this.UserProvider.splice(this.UserProvider.indexOf(user), 1);
                return {
                    data: user,
                    message: "user deleted"
                }
            } else{
                return {
                    message: "user not found",
                    data: {}
                }
            }

        }catch{
            return {
                message: "user not found",
                data: {}
            }
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

