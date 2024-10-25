
import { Result } from "../../interface/result";
import { ProductResponseDto } from "../products/dto/productResponseDto";
import { ProductProvider } from "../products/product-provider";
import { CartProvider } from "./cart-provider";
import { CartCreateDTO } from "./dto/cartCreateDTO";

export default class CartService{

    private cartProvider: CartProvider = new CartProvider();
    private productProvider: ProductProvider = new ProductProvider();

    async getCart(): Promise<Result>{
        try {
            
            return Result.createResult('teste');
        } catch (error) {
            throw error
        }
    }

    async updateCart():Promise<Result>{
        try {
            
            return Result.createResult('teste');
        } catch (error) {
            throw error
        }
    }

    async deleteCartItens():Promise<Result>{
        try {
            
            return Result.createResult('teste');
        } catch (error) {
            throw error
        }
    }

    async createCart(payload:any):Promise<Result>{
        try {
            const user = new CartCreateDTO(payload.body.name, payload.body.email);
            
            const existingCart  = await this.cartProvider.isCartExistingForUser(payload.body.email);
            
            if(existingCart.length === 1){
                const cartReturn = await this.cartProvider.findCartByID(existingCart[0].idCart, user.email, user.name, user.userID);
                
                return Result.createResult('Carrinho', cartReturn)
            }
            
            const newCart = await this.cartProvider.createCart(user);
            const cartReturn = await this.cartProvider.findCartByID(newCart.insertId, user.email, user.name, user.userID);

            return Result.createResult('Carrinho criado', cartReturn);

        } catch (error:any) {
            throw error.message;
        }
    }

    async addItemToCart(payload: {body: {idCart:number, idProduct:number, quantity: number}} ){
        try {
            const product = await this.productProvider.getItemById(payload.body.idProduct);
            
            const totalValue = (payload.body.quantity * product.unitValue);

            const hasProduct = await this.cartProvider.isItemExistingForCart(payload.body.idCart, product.idProduct);

            if(hasProduct){
                const productEdited = await this.editarItemCard(payload.body.idCart, payload.body.quantity, product)
                return productEdited;
            }
            
            await this.cartProvider.addItemToCart(payload.body.idCart, product, payload.body.quantity, totalValue);
            
            return Result.createResult('item adicionado');

        } catch (error: any) {
            throw error.message;
        }
        
    }

    async editarItemCard(idCart:number, quantity: number, product: ProductResponseDto){
        try {
            const totalValue = (quantity * product.unitValue);

            await this.cartProvider.upadateCardItem(idCart, quantity, totalValue, product.idProduct);

            return Result.createResult('');
        } catch (error: any) {
            throw error.message;
        }
    }


}