
import { ConnectionDatabase } from "../../database/conection-database";
import { Ipaginator } from "../../Dtos/paginator-model";
import { Iparams } from "../../Dtos/parameters-interface";

import { ProductResponseDto } from "./dto/productResponseDto";
import { CustomError } from "../common/common.model";

export class ProductProvider extends ConnectionDatabase {

    constructor() {
        super();
    }

    private async mapProductResponsesToDtos(ProductResponse: ProductResponseDto[]): Promise<ProductResponseDto[]>{
        ProductResponse.forEach(product => {
            new ProductResponseDto(
                product.idProduct, product.quantity, product.unitValue,
                product.nameProduct, product.description,product.totalValue,
                product.image);
        });
        return ProductResponse
    }

    public async getItemById(id:number): Promise<ProductResponseDto>{
        this.connect();
        try {
            const product: ProductResponseDto[] = await new Promise((resolve, reject) =>{
                let query = `SELECT * FROM product WHERE idProduct = ?`
                this.connection.query(query, [id], (error:any, productResponse: ProductResponseDto[] )=>{
                    if(error) {
                        reject(error) 
                    }else{
                        resolve(productResponse)
                    }
                });
            });

            const productReturn = await this.mapProductResponsesToDtos(product)
                
            return productReturn[0]

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
            
            const prodcutReturn = await this.mapProductResponsesToDtos(products)

            return prodcutReturn;

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