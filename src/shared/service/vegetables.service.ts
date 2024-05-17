import { Vegetables } from "../../models/vegetables-model";

const vegetables = require('../../database/vegetables.json');
export default class VegetableService{

    async delete(id:string){
        const vegetable = vegetables.find((e:Vegetables) => e.Id === parseInt(id));
        const deleteVegetable = vegetables.splice(parseInt(id)-1, 1)[0];
        return vegetables;
    }
    
    async put(id:string, body:Vegetables){
        const vegetable = vegetables.find((e:Vegetables) => e.Id === parseInt(id));
        vegetable.quantity =  vegetable.quantity - body.quantity ; 
        return vegetable;
    }

    async get(){
        return vegetables.filter((e:Vegetables)=> e.quantity !== 0)
    }
}