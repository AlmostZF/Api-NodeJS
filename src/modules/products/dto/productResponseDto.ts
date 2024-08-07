export class ProductResponseDto{
    idProduct: number;
    quantity: number;
    unitValue: number;
    nameProduct: string;
    description: string;
    totalValue: number;
    image: string;
    vote!: string;


    constructor(idProduct: number, quantity: number, unitValue: number, nameProduct: string, description: string, totalValue: number, image: string){
        this.idProduct = idProduct;
        this.quantity = quantity;
        this.unitValue = unitValue;
        this.nameProduct = nameProduct;
        this.description = description;
        this.totalValue = totalValue;
        this.image = image;   
    }
}