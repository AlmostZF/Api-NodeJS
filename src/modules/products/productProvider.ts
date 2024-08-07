import { ConnectionDatabase } from "../../database/conection-database";
import { ProductResponseDto } from "./dto/productResponseDto";

export class ProductProvider extends ConnectionDatabase {

    constructor() {
        super();
    }

    async getAllItens(): Promise<ProductResponseDto[]>{
        this.connect();
        try {
            const products :ProductResponseDto[] = await new Promise((resolve, reject) =>{
                const query = `SELECT * FROM product`;
                this.connection.query(query, (error:any, productsResponse:ProductResponseDto[])=>{
                    if(error) {
                        reject(error) 
                    }else{
                        resolve(productsResponse)
                    }
                });
            });
            
            let productsResponse: ProductResponseDto[] = [];
            products.forEach(product => {
                let productResponse = new ProductResponseDto(
                    product.idProduct, product.quantity, product.unitValue,
                    product.nameProduct, product.description,product.totalValue,
                    product.image);
                productsResponse.push(productResponse);
            });
            console.log(productsResponse);
            return productsResponse;
        } catch (error) {
            console.error("Error executing query:",error)
            throw error;
        } finally {
            // this.disconnect();
        }
    }


    async filterItens(params: any, queryParams: String[], paginatorParams?: any): Promise<ProductResponseDto[]>{
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
            
            query += ` LIMIT ${paginatorParams['limit'] } OFFSET ${paginatorParams['offset']}`;
            
            const products:ProductResponseDto[] = await new Promise((resolve, reject) =>{
                this.connection.query(query, queryParams, (error, productsResponse:ProductResponseDto[])=>{
                    if(error) { 
                        reject(error) 
                    }else{
                        resolve(productsResponse)
                    }
                });
            });

            let productsResponse: ProductResponseDto[] = [];
            products.forEach(product => {
                let productResponse = new ProductResponseDto(
                    product.idProduct, product.quantity, product.unitValue,
                    product.nameProduct, product.description,product.totalValue,
                    product.image);
                productsResponse.push(productResponse);
            });
            console.log(productsResponse);
            return productsResponse
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