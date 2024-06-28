import { ConnectionDatabase } from "./conection-database";

export class ProductProvider extends ConnectionDatabase {

    constructor() {
        super();
    }

    async getAllItens(): Promise<any>{
        this.connect();
        try {
            const result = await new Promise((resolve, reject) =>{
                const query = `SELECT * FROM product`;
                this.connection.query(query, (error, results)=>{
                    if(error) {
                        reject(error) 
                    }else{
                        resolve(results)
                    }
                });
            });
            return result
        } catch (error) {
            console.error("Error executing query:",error)
            throw error;
        } finally {
            // this.disconnect();
        }
    }


    async filterItens(params:any, queryParams:String[]): Promise<any>{
        this.connect();
        try {
            let query = `SELECT * FROM product WHERE 1=1`;

            params.forEach((element:any) => {
                if(element.field === 'nameProduct'){
                    query += ` AND ${element.field} LIKE ?`
                    queryParams[0] = `%${queryParams[0]}%`
                }else{
                    query += ` AND ${element.field} = ?` 
                }
            });
            
            const result = await new Promise((resolve, reject) =>{
                this.connection.query(query, queryParams, (error, results)=>{
                    if(error) {
                        reject(error) 
                    }else{
                        resolve(results)
                    }
                });
            });
            return result
        } catch (error) {
            console.error("Error executing query:",error)
            throw error;
        } finally {
            // this.disconnect();
        }
    }

    async destroy() {
        if (this.connection) {
            await this.disconnect();
        }
    }
}