import { Iparams } from './../../interface/parameters-interface';
import { Ipaginator } from './../../interface/paginator-model';

import { ConnectionDatabase } from "../../database/conection-database";


import { ProductResponseDto } from "./dto/productResponseDto";
import { CustomError } from "../common/common.model";

export class ProductProvider extends ConnectionDatabase {

    constructor() {
        super();
    }

    public mapProductResponsesToDtos(ProductResponse: ProductResponseDto[]): ProductResponseDto[]{
        ProductResponse.forEach(product => {
            new ProductResponseDto(
                product.idProduct, product.unitValue,
                product.nameProduct, product.description,
                product.image, product.total);
        });
        return ProductResponse
    }

    public async getItemById(id:number): Promise<ProductResponseDto>{
        this.connect();
        try {
            return await new Promise((resolve, reject) =>{
                let query = `
                    SELECT * 
                    FROM product 
                    WHERE idProduct = ?`

                this.connection.query(query, [id], (error:any, productResponse: ProductResponseDto[] )=>{
                    if(error) {
                        reject(error);
                        throw error; 
                    }
                    if(productResponse.length == 0){
                        
                        reject(new CustomError('item nao encontrado'));

                    }else{

                        resolve(this.mapProductResponsesToDtos(productResponse)[0])

                    }
                });
            });

        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw error;
        } finally {
            // this.disconnect();
        }
    }

    public async getAllItens(paginatorParams:Ipaginator): Promise<ProductResponseDto[]>{
        this.connect();
        try {
            return await new Promise((resolve, reject) =>{
                let query = `
                    SELECT * 
                    FROM product`
                ;
                query += ` LIMIT ${paginatorParams.limit} OFFSET ${paginatorParams.offset}`;
                this.connection.query(query, (error:any, productsResponse:ProductResponseDto[])=>{
                    if(error) {
                        reject(error);
                        throw error; 
                    }else{
                        resolve(this.mapProductResponsesToDtos(productsResponse))
                    }
                });
            });


        } catch (error) {
            console.error("Error executing query:",error)
            throw error;
        } finally {
            // this.disconnect();
        }
    }


    public async filterItens(params: Iparams[], queryParams: string[], paginatorParams: Ipaginator): Promise<ProductResponseDto[]>{
        this.connect();
        try {
            let query = `SELECT * FROM product WHERE 1=1`;
                params.forEach((filter:any, index:any) => {
                query += ` AND ${filter.field} = ?`;
                queryParams.push(filter.value);
              });
              query += ` LIMIT ${paginatorParams.limit} OFFSET ${paginatorParams.offset}`;
            return await new Promise((resolve, reject) =>{
                this.connection.query(query, queryParams, (error, productsResponse:ProductResponseDto[])=>{
                    if(error) { 
                        reject(error);
                        throw error; 
                    }else{
                        resolve(this.mapProductResponsesToDtos(productsResponse))
                    }
                });
            });

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