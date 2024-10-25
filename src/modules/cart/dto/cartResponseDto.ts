import { ProductResponseDto } from "../../products/dto/productResponseDto";

export class CartResponseDto {
    idCart: number;
    idUser: number = 0;
    email: string;
    name: string;
    total: number;
    quantityProduct: number;
    products: ProductResponseDto[];
    
    constructor(email: string, name: string, quantityProduct: number, products: ProductResponseDto[], idCart: number, total:number ){
        this.email = email;
        this.name = name;
        this.quantityProduct = quantityProduct;
        this.products = products;
        this.idCart = idCart
        this.total = total;   
    }
    
}