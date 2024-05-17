import { Result } from "../../models/result";
import { User } from "../../models/user-model";
import { UserProvider } from "../../database/userProvider";
import bcrypt from 'bcrypt';

//   ugo@gmail.com
// 1111111
// ana@example.com
// senha123
// joao@example.com
// acb123
// maria@example.com
// qwerty
export default class SessionService{

    userProvider: UserProvider = new UserProvider()
    private tableName: string = 'usersLogin';

    async get(){
        return  "get";
    }

    async post(req:any, body:User): Promise<Result>{
        try {
            const user = await this.userProvider.login(body.email);
            if(user.length === 0) return this.creatResult(false, "login failed");
            const passwordHash = await this.compareHash(body.password, user[0].password)
            return passwordHash === true
            ? this.creatResult(true, "login success") 
            : this.creatResult(false, "login failed");
        } catch (error) {
            console.error('Erro ao processar solicitação:', error);
            return this.creatResult(false, "Internal server error");
        }
            
    }

    private async compareHash(requiredPassword: string, userPassword:string ): Promise<boolean>{
        try {
            const compare = await bcrypt.compare(requiredPassword, userPassword);
            return compare;    
        } catch (error) {
            console.error('Error executing query:', error);
            return false;
        }
    }
    
    private async createHash(userPassword:string): Promise<string>{
        return await bcrypt.hash(userPassword,10);   
    }

    private creatResult(success: boolean, message: string, data?:any): Result{
        const result: Result = {
            success: success,
            message: message,
        }
        data? result.data = data : null;
        return result;
    }
    
    async put(){
        return  "put";
    }

    async editUser(req:any, body:User): Promise<Result>{
        try{
            const user = await this.userProvider.selectAllUsers(this.tableName);
            
            user.find((e:User)=> e.idUser === body.idUser)
            // this.passwordHash = await bcrypt.hash(body.password, 10);
            if(!user){
                return {
                    success: false,
                    message:"user not found",
                }
            }else{
                return {
                    success: true,
                    data: user,
                    message: "user updated"
                }
            }
        } catch(error: any){
            return {
                success: false,
                message: error.message
            }};
    }

    async createUser(req: any, body:User): Promise<Result>{
        try{
            const isUserExisting = await this.userProvider.verifyUserExist(body.email);
            if(isUserExisting === true) return this.creatResult(false, "user already exists");
            body.password = await this.createHash(body.password);
            await this.userProvider.signUp(body);
            return this.creatResult(true, "user created");
        }catch(error: any){
            return this.creatResult(false, error.message);
        }
    }
    
    async delete(req:any , body:User): Promise<Result>{
        try{   
            const user = await this.userProvider.selectAllUsers(this.tableName);
            const userFind = user.find((e:User)=> e.email === body.email)
            if(user){
                this.userProvider.deleteUser(userFind.idUser, this.tableName);
                // this.userProvider.splice(this.userProvider.indexOf(user), 1);
                return {
                    success: true,
                    data: user,
                    message: "user deleted"
                }
            } else{
                return {
                    success: false,
                    message: "user not found"
                }
            }

        }catch{
            return {
                success: false,
                message: "user not found"
            }
        }
        
    }
};

