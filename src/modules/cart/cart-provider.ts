import { ConnectionDatabase } from "../../database/conection-database";
import { CartResponseDto } from "./dto/cartResponseDto";
import { CartCreateDTO } from "./dto/cartCreateDTO";
import { ProductResponseDto } from "../products/dto/productResponseDto";
import { ProductProvider } from "../products/product-provider";

export class CartProvider extends ConnectionDatabase{

    private productProvicer: ProductProvider = new ProductProvider();
    constructor() {
        super();
    }


    private mapCartResponsesToDtos(cartReturn: CartResponseDto[]): CartResponseDto[]{

        cartReturn.forEach(cart => {
            new CartResponseDto(
                cart.email, cart.name, 
                cart.quantityProduct, cart.products,
                cart.idCart, cart.total
            )
        });
        return cartReturn;
    }

    public mapCartResponses(products: ProductResponseDto[], email: string, name: string, quantityProduct: number, total:number, idCart:number ): CartResponseDto{

        return new CartResponseDto(
            email, name, 
            quantityProduct, products,
            idCart, total
        );
    }

      // private mapCartResponsesToDtos(cartReturn: CartResponseDto[], products:ProductResponseDto[]): CartResponseDto[]{
    //     cartReturn.forEach(cart => {
    //         new CartResponseDto(
    //             cart.email, cart.name, 
    //             cart.quantityProduct, products, 
    //             cart.idUser, cart.total
    //         )
    //     });
    //     return cartReturn;
    // }

    private mapCartItemResponsesToDtos(cartReturn: CartCreateDTO[]): CartCreateDTO[]{
        cartReturn.forEach(cart => {
            new CartCreateDTO(
                cart.name, cart.email, 
            )
        });
        return cartReturn;
    }

    


    public async addItemToCart(idCart: number, product: ProductResponseDto, quantity:number, totalValue:number): Promise<any>{
        try {
            return await new Promise((resolve, reject)=>{
                const query = `
                    INSERT INTO cart_item (idCart, idProduct, quantityProduct, unitValue, total)
                    VALUE (?,?,?,?,?)`
                this.connection.query(
                    query, [idCart, product.idProduct, quantity, product.unitValue, totalValue], (error:any, result:any) => {
                        if(error) {
                            reject(error)
                            throw error;
                        }else{
                            resolve(result)
                        }
                    });
            })                
            // const idProduct = await this.productProvider.getItemById(idProductParam);
            // const idCart = await 
            
        } catch (error) {
            throw new Error("Erro ao adicionar item ao carrinho");
            
        }
    }

    // public async 
    public async deleteCardItem(idCartItem:number){
        try {
            return await new Promise((resolve, reject)=>{
                const query = `
                    DELETE FROM cart_item 
                    WHERE idCartIten = ?`
                this.connection.query(
                    query, [idCartItem], (error:any, result:any) => {
                        if(error) {
                            reject(error)
                            throw error;
                        }else{
                            return (result)
                        }
                    });
            })                
            
        } catch (error) {
            throw new Error("Erro ao adicionar item ao carrinho");
            
        }
    }
    
    public async upadateCardItem(idCart:number, quantity:number, totalValue:number, idProduct:number ){
        try {
            return await new Promise((resolve, reject)=>{
                const query = `
                    UPDATE cart_item
                    SET quantityProduct = ?,
                    total = ?
                    WHERE idCart = ?
                    AND idProduct = ?`
                this.connection.query(
                    query, [quantity, totalValue, idCart, idProduct], (error:any, result:any) => {
                        if(error) {
                            reject(error)
                            throw error;
                        }else{
                            resolve(result)
                        }
                    });
            })                
            
        } catch (error) {
            throw new Error("Erro ao editar item no carrinho");
            
        }
    }


    // public async findCartByUser(req: any): Promise<CartProvider>{
    //     const query = "INSERT INTO cart (IdUser, name, email) VALUE (?, ?, ?)"
    //     const cartResponse = this.mapCartResponsesToDtos();

    //     return cartResponse
    // }

    public async createCart(user: CartCreateDTO): Promise<any>{
        const idUser = null
        try {
            return await new Promise((resolve, reject) =>{
                const query = `
                    INSERT INTO cart (IdUser, name, email) 
                    VALUE (?, ?, ?)`;

                this.connection.query(query, [idUser, user.name, user.email], (error:any, responseCart:any) =>{
                    if(error) {
                        reject(error) 
                    }else{
                        resolve(responseCart)
                    }
                });
            });

        } catch (error) {
            throw error;
        }
    }

    public async isCartExistingForUser(email: any): Promise<any>{
        try {
            return await new Promise((resolve, reject) =>{

                const query = `
                    SELECT * 
                    FROM cart 
                    WHERE email = ?`;

                this.connection.query(query, (email), (error:any, result:any) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(result);
                    }
                });
            });
            
        } catch (error) {
            throw new Error('Ocorreu um erro');

        }
    } 

    public async isItemExistingForCart(idCart: number, idProduct:number): Promise<boolean>{
        try {
            return await new Promise((resolve, reject) =>{

                const query = `
                    SELECT * 
                    FROM cart_item
                    WHERE idCart = ?
                    AND idProduct = ?`;

                this.connection.query(query, [idCart, idProduct], (error:any, result:any) => {
                    if(error){
                        reject(error);
                    }else{
                        resolve(result.length == 1);
                    }
                });
            });
            
        } catch (error) {
            throw error;

        }
    } 

    public async findCartByID(id: number, email:string, name:string, userID:number|null): Promise<CartResponseDto>{
        try {
            return await new Promise((resolve, reject) => {
                const query = `
                    SELECT
                        product.nameProduct,
                        product.description,
                        product.image,
                        product.idProduct,
                        cart_item.idProduct,
                        cart_item.quantityProduct,
                        cart_item.unitValue,
                        cart_item.total
                    FROM cart 
                    JOIN cart_item ON cart.idCart = cart_item.idCart
                    JOIN product ON cart_item.idProduct = product.idProduct
                    WHERE cart.idCart = ?`
                this.connection.query(query, (id), (error:any, result:ProductResponseDto[]) => {
                    if(error){
                        reject(error);
                    }else{
                        this.productProvicer.mapProductResponsesToDtos(result);

                        const quantity = result.length;

                        const totalValue = result.reduce((accumulator, item) => {
                            return accumulator + item.total;
                        }, 0);

                        resolve( this.mapCartResponses(result, email, name, quantity, totalValue, id) );

                    }
                })
            })
        } catch (error) {
            throw error;
        }
    }
    
}

