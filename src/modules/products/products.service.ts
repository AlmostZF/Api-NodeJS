import { Result } from '../../Dtos/result';
import { failureResponse } from '../common/common.service';
import { ProductResponseDto } from './dto/productResponseDto';
import { ProductProvider } from "./productProvider";
import { CustomError } from "../common/common.model"
import { Ipaginator } from '../../Dtos/paginator-model';
import { Iparams } from '../../Dtos/parameters-interface';

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
            return this.createResult("Product Edited", product);
        } catch (error) {
            console.error("Erro ao processar", error);
            return this.createResult( "Internal server error");
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
                return this.createResult("Product list filtered successfully", {products: product});
            }
            
            product = await this.itens.getAllItens(completePaginatorParams);
            return this.createResult( "Product list", {products: product});
            
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
            
            return this.createResult( "sucess GET itens", products );
        } catch (error) {
            console.error("Erro ao processar", error);
            return this.createResult("Internal server error");
        }
    }

    public async get(req: any): Promise<Result>{
        try {
            let parametersPaginator: Ipaginator = await this.setParameters(req.query.page, req.query.limit);
            if(isNaN(parametersPaginator.offset)){
                throw new CustomError('Parâmetros inválidos');
            }
            const products = await this.itens.getAllItens(parametersPaginator);

            return this.createResult("Sucesso ao buscar itens ", products );
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

                return this.createResult("Sucesso ao buscar itens", product );

            } catch (error) {
                if(error instanceof CustomError){
                    throw error;
                }
                throw new Error("Tente novamente mais tarde");
            }

    }

    private createResult<T>(message: string, data?:T): Result{
        const result: Result = {
            message: message,
            data
        }
        return result;
    }
    
}