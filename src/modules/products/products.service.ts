import { Ipaginator } from './../../interface/paginator-model';
import { Iparams } from './../../interface/parameters-interface';
import { Result } from './../../interface/result';

import { ProductResponseDto } from './dto/productResponseDto';
import { ProductProvider } from "./product-provider";
import { CustomError } from "../common/common.model"


export default class ProductService{

    private itens: ProductProvider = new ProductProvider();

    // async delete(id:string){
    //     const vegetable = vegetables.find((e:Product) => e.Id === parseInt(id));
    //     const deleteVegetable = vegetables.splice(parseInt(id)-1, 1)[0];
    //     return vegetables;
    // }
    
    public async put(body:ProductResponseDto): Promise<Result>{
        try {
            const product: ProductResponseDto[] = await this.itens.filterItens([
                {field: 'nameProduct', value: 'req.query.name'},
                {field: 'unitValue', value: 'req.query.name'},
                {field: 'type', value: 'req.query.name'},
                {field: 'vote', value: 'req.query.name'},
            ], [], { page: 1, limit: 7, offset: 0 });
            const result = Result.createResult("Product Edited", product)
            return result
        } catch (error) {
            console.error("Erro ao processar", error);
            return Result.createResult("Internal server error")
        }
    }

    public async filter(req:any): Promise<Result>{
        try {
            let product!: ProductResponseDto[];
            
            const completePaginatorParams = await this.setParameters(req.query.page, req.query.limit);
           
            const allowedParams = ['name', 'value', 'vote', 'type','page', 'limit'];
            const queryParams = Object.keys(req.query);

            const hasInvalidParams = allowedParams.some((params) => queryParams.includes(params));

            if (!hasInvalidParams && queryParams.length != 0 ) {
                throw new CustomError("Revise os dados enviados");
            }

            const formatedParams: Iparams[] = [
                {field: 'nameProduct', value: req.query.name},
                {field: 'unitValue', value: req.query.value},
                {field: 'type', value: req.query.type},
                {field: 'vote', value: req.query.vote},
            ]

            const conditions = formatedParams.filter((filter) => {
                return filter.value !== undefined && filter.value !== null && typeof filter.value === 'string' && filter.value.length <= 100;
            });

            const filteredParams:string[] = conditions.map((filter) => filter.value)

            if (filteredParams.length > 0 ) {
                product = await this.itens.filterItens(conditions, filteredParams, completePaginatorParams);
                return Result.createResult("Product list filtered successfully", {products: product});
            }
            
            product = await this.itens.getAllItens(completePaginatorParams);
            return Result.createResult( "Product list", {products: product});
            
        } catch (error: any) {
            if(error instanceof CustomError){
                throw error
            }
            console.error("Erro ao processar", error);
            throw new Error("Problemas internos com o servidor");
        }
    }

    public async setParameters(page?: number, limit?: number): Promise<Ipaginator> {
        const paginatorParams = {
            page: page ?? 1,
            limit: limit ?? 10
        }
        let offsetParam = (paginatorParams.page - 1) * paginatorParams.limit;
        const completePaginatorParams = {
            ...paginatorParams,
            offset: offsetParam
        };
        return completePaginatorParams
    }

    public async getList(parametersPaginator: Ipaginator): Promise<Result>{
        try {
            const products = await this.itens.getAllItens(parametersPaginator);
            
            return Result.createResult( "sucess GET itens", products );
        } catch (error) {
            console.error("Erro ao processar", error);
            return Result.createResult("Internal server error");
        }
    }

    public async get(req: any): Promise<Result>{
        try {
            let parametersPaginator: Ipaginator = await this.setParameters(req.query.page, req.query.limit);
            if(isNaN(parametersPaginator.offset)){
                throw new CustomError('Parâmetros inválidos');
            }
            const products = await this.itens.getAllItens(parametersPaginator);

            return Result.createResult("Sucesso ao buscar itens ", products );
        } catch (error:any) {
            if(error instanceof CustomError){
                throw error;
            }
            throw new Error("Tente novamente mais tarde");
        }
    }

    public async getProductById(req: any): Promise<Result>{
            try {
                const id = Number(req.params.id);
                if(isNaN(id)){
                    throw new CustomError('Parâmetro inválido');
                }
                const product = await this.itens.getItemById(id);

                return Result.createResult("Sucesso ao buscar itens", product );

            } catch (error) {
                if(error instanceof CustomError){
                    throw error;
                }
                throw new Error("Tente novamente mais tarde");
            }

    }

}