import { ConnectionDatabase } from "../../database/conection-database";
import { User } from "../../Dtos/user-model";



export class UserProvider extends ConnectionDatabase{
    connection: any;

    constructor(){
        super();
    }

    async selectAllUsers(tableName: string): Promise<any> {
        try {
            const results = await new Promise((resolve, reject) => {
                this.connection.query(`SELECT * FROM ${tableName}`, (error: any, results: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            this.destroy();
            return results;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async updateEmail(email:string, newEmail:string): Promise<any> {
        const tableName = 'userAuthentication';
        this.connect();
        const updateQuery = `
            SET @idUser := (
                SELECT idUser 
                FROM ${tableName}
                WHERE email = ?
            )
            UPDATE ${tableName}
            SET password = ? 
            WHERE email = ?
            AND @idUser ` ;
        try {
            const results = await new Promise((resolve, reject) => {
                this.connection.query(updateQuery, [email, newEmail, email], (error: any, results: any) => {
                    if (error) {
                        throw error;
                    } else {
                        return results;
                    }
                });
            });
            return results;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }

    };

    async updatePasswordUser(email:string,password:string, ): Promise<any> {
        const tableName = 'userAuthentication';
        this.connect();
        const updateQuery = `
            SET @idUser := (
                SELECT idUser 
                FROM  ${tableName}
                WHERE email = ?
            )
            UPDATE  ${tableName}
            SET password = ? 
            WHERE email = ?
            AND @idUser ` ;
        try {
            const result = await new Promise((resolve, reject)=>{
                this.connection.query(updateQuery, [email,password,email],(error:any, result:any)=>{
                    if(error){
                        throw error;
                    }else{
                        return result;
                    }
                });
            });
            return result;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    };

    async destroy() {
        if (this.connection) {
            await this.disconnect();
        }
    }


    /**
     * login function catch the user password by email
     * @param email 
     * @returns User passoword like a hash
     */
    async login(email: string): Promise<any> {
        const tableName = 'userAuthentication';
        this.connect();
        const query = `SELECT password, idUser FROM ${tableName} WHERE email = ?`;
        try {
            const results = await new Promise((resolve, reject) => {
                this.connection.query(query, [email], (error: any, results: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            return results;
        }catch(error){
            console.error('Error executing query:', error);
            throw error;
        } finally {
            await this.destroy();
        }

    }
    async selectUserByEmail(email: string): Promise<any> {
        this.connect();
        const query = `SELECT password FROM user WHERE email = ?`;
        try {
            const results = await new Promise((resolve, reject) => {
                this.connection.query(query, [email], (error: any, results: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                        return results;
                    }
                });
            });
            return results;
        }catch(error){
            console.error('Error executing query:', error);
            throw error;
        } finally {
            await this.destroy();
        }
    }
    
    async verifyUserExist(email: string): Promise<any> {
        const tableName = 'userAuthentication';
        this.connect();
        try {
            const userExist = await new Promise((resolve, reject) => {
                const emailQuery = `
                    SELECT email 
                    FROM  ${tableName}
                    WHERE email = ?`;
                this.connection.query(emailQuery, [email], (error: any, results: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.length > 0);
                    }
                });
            });
    
            return userExist;

        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }finally {
            await this.destroy();
        }
    }

    async signUp(createUser: User): Promise<any> {
        this.connect();
        try {
            const user = await this.createUser(createUser.email, createUser.name);   
            const userLogin = await this.createUserAuthenticate(createUser.email, createUser.password, user.insertId);   
            return userLogin;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }finally {
            await this.destroy();
        }
    }

    async createUser(email:string, name:string): Promise<any> {
        const tableName = 'user';
        this.connect();
        try {
            const results = await new Promise((resolve, reject) => {
                const query = `INSERT INTO  ${tableName} (email, name) VALUES (?, ?)`;
                this.connection.query(query, [email,name], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            return results;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
    async createUserAuthenticate (email:string, password:string, idUser:number): Promise<any> {
        const tableName = 'userAuthentication';
        this.connect();
        try {
            const result = await new Promise((resolve, reject) => {
                const query = `INSERT INTO  ${tableName} (email, password, idUser) VALUES (?, ?, ?)`;
                this.connection.query(query, [email, password, idUser], (error, results) => {
                    if (error) { 
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            return result;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }


    async deleteUser(idUser: number, tableName: string):Promise<any>{
        try {

            const results = await new Promise((resolve, reject) => {
                const query = `DELETE FROM ${tableName} WHERE idUser = ?`;
                this.connection.query(query, [idUser], (error, results) => {
                    if (error) {
                        this.disconnect();
                        reject(error);
                    } else {
                        this.disconnect();
                        resolve(results);
                    }
                });
            });
            return results;
        } catch (error) {
            this.disconnect();
            console.error('Error executing query:', error);
            throw error;
        }
    }
    
}