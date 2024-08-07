import bcrypt from 'bcrypt';

export class AuthLogin{

    static async compareHash(requiredPassword: string, userPassword:string ): Promise<boolean>{
        try {
            const compare = await bcrypt.compare(requiredPassword, userPassword);
            return compare;    
        } catch (error) {
            console.error('Error executing query:', error);
            return false;
        }
    }
    
    static async createHash(userPassword:string): Promise<string>{
        return await bcrypt.hash(userPassword,10);   
    }

}