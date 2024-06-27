import { Product } from './../../models/products-model';
import { ItemProvider } from "../../database/itensProvider";
import { Result } from "../../models/result";

const vegetables = require('../../database/vegetables.json');
export default class ProductService{

    private itens: ItemProvider = new ItemProvider();

    async delete(id:string){
        const vegetable = vegetables.find((e:Product) => e.Id === parseInt(id));
        const deleteVegetable = vegetables.splice(parseInt(id)-1, 1)[0];
        return vegetables;
    }
    
    async put(body:Product): Promise<Result>{
        try {
            const product: Product = await this.itens.filterItens(body.Id, []);
            return this.creatResult(true, "Product Edited", product);
        } catch (error) {
            console.error("Erro ao processar", error);
            return this.creatResult(false, "Internal server error");
        }
    }

    async filter(req:any): Promise<Result>{
        try {
            let product!: Product;
            const formatedParams = [
                {field: 'nameProduct', value: req.query.name},
                {field: 'unitValue', value: req.query.value? Number(req.query.value) : req.query.value},
                {field: 'type', value: req.query.type},
                {field: 'vote', value: req.query.vote? Number(req.query.vote) : req.query.vote},
            ]

            const conditions = formatedParams.filter((filter)=> filter.value !== undefined && filter.value !== null);
            const filteredParams = conditions.map((filter)=> filter.value)
            console.log(filteredParams)
            if (conditions.length > 0) {
                product = await this.itens.filterItens(conditions, filteredParams);
                return this.creatResult(true, "Product Edited", product);
            }

            product = await this.itens.getAllItens();
            return this.creatResult(true, "Product Edited", product);
        } catch (error) {
            console.error("Erro ao processar", error);
            return this.creatResult(false, "Internal server error");
        }
    }

    async getList(): Promise<Result>{
        try {
            const products = await this.itens.getAllItens();
            return this.creatResult(true, "sucess GET itens", products );
        } catch (error) {
            console.error("Erro ao processar", error);
            return this.creatResult(false, "Internal server error");
        }
    }

    async get(): Promise<Result>{
        try {
            const products = await this.itens.getAllItens();
            return this.creatResult(true, "sucess GET itens", products );
        } catch (error) {
            console.error("Erro ao processar", error);
            return this.creatResult(false, "Internal server error");
        }
    }

    private creatResult(success: boolean, message: string, data?:any): Result{
        const result: Result = {
            success: success,
            message: message,

        }
        data? result.data = data : null;
        return result;
    }
    
}