import { ConnectionDatabase } from "../../database/conection-database";
import { Ipaginator } from "../../Dtos/paginator-model";
import { Iparams } from "../../Dtos/parameters-interface";

import { ProductResponseDto } from "./dto/productResponseDto";

export class ProductProvider extends ConnectionDatabase {

    constructor() {
        super();
    }

    async getAllItens(paginatorParams:Ipaginator): Promise<ProductResponseDto[]>{
        this.connect();
        try {
            const products: ProductResponseDto[] = await new Promise((resolve, reject) =>{
                let query = `SELECT * FROM product`;
                query += ` LIMIT ${paginatorParams.limit} OFFSET ${paginatorParams.offset}`;
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

            return productsResponse;
        } catch (error) {
            console.error("Error executing query:",error)
            throw error;
        } finally {
            // this.disconnect();
        }
    }


    async filterItens(params: Iparams[], queryParams: string[], paginatorParams: Ipaginator): Promise<ProductResponseDto[]>{
        this.connect();
        try {
            let query = `SELECT * FROM product WHERE 1=1`;
                params.forEach((filter:any, index:any) => {
                query += ` AND ${filter.field} = ?`;
                queryParams.push(filter.value);
              });
              query += ` LIMIT ${paginatorParams.limit} OFFSET ${paginatorParams.offset}`;
            const products: ProductResponseDto[] = await new Promise((resolve, reject) =>{
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