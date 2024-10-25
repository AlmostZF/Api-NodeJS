import { ConnectionDatabase } from "../../database/conection-database";
import { IUser } from "../../interface/user-model";




export class SessionProvider extends ConnectionDatabase{
    declare connection: any;

    constructor(){
        super();
    }

    async destroy() {
        if (this.connection) {
            await this.disconnect();
        }
    }

    async login(email: string): Promise<any> {
        const tableName = 'userAuthentication';
        this.connect();
        const query = `SELECT password, idUser FROM ${tableName} WHERE email = ?`;
        try {
            return await new Promise((resolve, reject) => {
                this.connection.query(query, [email], (error: any, results: any) => {
                    if (error) {
                        reject(error);
                        throw error
                    } else {
                        resolve(results);
                    }
                });
            });
        }catch(error){
            console.error('Error executing query:', error);
            throw error;
        } finally {
            await this.destroy();
        }

    }
    
    async verifyUserExist(email: string): Promise<boolean> {
        const tableName = 'userAuthentication';
        this.connect();
        try {
            return await new Promise((resolve, reject) => {
                const emailQuery = `
                    SELECT email 
                    FROM  ${tableName}
                    WHERE email = ?`;
                this.connection.query(emailQuery, [email], (error: any, results: any) => {
                    if (error) {
                        reject(error);
                        throw error
                    } else {
                        resolve(results.length > 0);
                    }
                });
            });

        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }finally {
            await this.destroy();
        }
    }

    async signUp(createUser: IUser): Promise<any> {
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
            return await new Promise((resolve, reject) => {
                const query = `INSERT INTO  ${tableName} (email, name) VALUES (?, ?)`;
                this.connection.query(query, [email,name], (error:any, results:any) => {
                    if (error) {
                        reject(error);
                        throw error
                    } else {
                        resolve(results);
                    }
                });
            });
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
                this.connection.query(query, [email, password, idUser], (error:any, results:any) => {
                    if (error) {
                        reject(error);
                        throw error
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


}