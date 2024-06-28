import { Product } from './../../models/products-model';
import { ProductProvider } from "../../database/productProvider";
import { Result } from "../../models/result";

const vegetables = require('../../database/vegetables.json');
export default class ProductService{

    private itens: ProductProvider = new ProductProvider();

    async delete(id:string){
        const vegetable = vegetables.find((e:Product) => e.Id === parseInt(id));
        const deleteVegetable = vegetables.splice(parseInt(id)-1, 1)[0];
        return vegetables;
    }
    
    async put(body:Product): Promise<Result>{
        try {
            const product: Product = await this.itens.filterItens(body.Id, []);
            return this.createResult(true, "Product Edited", product);
        } catch (error) {
            console.error("Erro ao processar", error);
            return this.createResult(false, "Internal server error");
        }
    }

    async filter(req:any): Promise<Result>{
        try {
            let product!: Product;

            const allowedParams = ['name', 'value', 'vote', 'type'];
            const queryParams = Object.keys(req.query);

            const hasInvalidParams = allowedParams.some((params)=> queryParams.includes(params));

            if (!hasInvalidParams && queryParams.length != 0 ) {
                return this.createResult(false, "Invalid query parameters");
            }

            const formatedParams = [
                {field: 'nameProduct', value: req.query.name},
                {field: 'unitValue', value: req.query.value},
                {field: 'type', value: req.query.type},
                {field: 'vote', value: req.query.vote},
            ]

            const conditions = formatedParams.filter((filter) => filter.value !== undefined && filter.value !== null);
            const filteredParams = conditions.map((filter)=> filter.value)

            if (conditions.length > 0) {
                product = await this.itens.filterItens(conditions, filteredParams);
                return this.createResult(true, "Product list filtered successfully", {products: product});
            }

            product = await this.itens.getAllItens();
            return this.createResult(true, "Product list", {products: product});

        } catch (error) {
            console.error("Erro ao processar", error);
            return this.createResult(false, "Internal server error");
        }
    }

    async getList(): Promise<Result>{
        try {
            const products = await this.itens.getAllItens();
            return this.createResult(true, "sucess GET itens", products );
        } catch (error) {
            console.error("Erro ao processar", error);
            return this.createResult(false, "Internal server error");
        }
    }

    async get(): Promise<Result>{
        try {
            const products = await this.itens.getAllItens();
            return this.createResult(true, "sucess GET itens", products );
        } catch (error) {
            console.error("Erro ao processar", error);
            return this.createResult(false, "Internal server error");
        }
    }

    private createResult<T>(success: boolean, message: string, data?:T): Result{
        const result: Result = {
            success: success,
            message: message,

        }
        if (data) {
            Object.assign(result, data);
        }
        return result;
    }
    
}