import { ConnectionDatabase } from "../../database/conection-database";




export class UserProvider extends ConnectionDatabase{
    declare connection: any;
    
    constructor(){
        super();
    }

    async selectAllUsers(): Promise<any> {
        try {
            return await new Promise((resolve, reject) => {
                this.connection.query(`SELECT * FROM user`, (error: any, results: any) => {
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
            return await new Promise((resolve, reject) => {
                this.connection.query(updateQuery, [email, newEmail, email], (error: any, results: any) => {
                    if (error) {
                        throw error;
                    } else {
                        return results;
                    }
                });
            });
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }

    };

    async updatePasswordUser(email:string, password:string): Promise<any> {
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
           return await new Promise((resolve, reject)=>{
                this.connection.query(updateQuery, [email,password,email],(error:any, result:any)=>{
                    if(error){
                        throw error;
                    }else{
                        return result;
                    }
                });
            });
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

    async selectUserByEmail(email: string): Promise<any> {
        this.connect();
        const query = `SELECT password FROM user WHERE email = ?`;
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
        } finally {
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
            return await new Promise((resolve, reject) => {
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
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }


    async deleteUser(idUser: number, tableName: string):Promise<any>{
        try {
            return await new Promise((resolve, reject) => {
                const query = `DELETE FROM ${tableName} WHERE idUser = ?`;
                this.connection.query(query, [idUser], (error:any, results:any) => {
                    if (error) {
                        this.disconnect();
                        reject(error);
                        throw error
                    } else {
                        this.disconnect();
                        resolve(results);
                    }
                });
            });
        } catch (error) {
            this.disconnect();
            console.error('Error executing query:', error);
            throw error;
        }
    }
    
}