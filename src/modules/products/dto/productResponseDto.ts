export class ProductResponseDto{
    idProduct: number;
    quantity: number = 1;
    unitValue: number;
    nameProduct: string;
    description: string;
    image: string;
    vote!: string;
    total: number;

    constructor(idProduct: number, unitValue: number, nameProduct: string, description: string, image: string, total:number){
        this.idProduct = idProduct;
        this.unitValue = unitValue;
        this.nameProduct = nameProduct;
        this.description = description;
        this.image = image;   
        this.total = total;
    }
    
}