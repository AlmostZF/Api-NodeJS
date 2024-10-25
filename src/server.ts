import express, { Router } from 'express';
import cors from 'cors';
import { SessionRoute } from './routes/session-routes';
import { CartRoute } from './routes/cart-routes';
import { ProductsRoute } from './routes/products-routes';
import { UserRoutes } from './routes/user-routes';

const router = Router();

class Server {
    public server: express.Application;
    private sesssion_route: SessionRoute = new SessionRoute();
    private cart_route: CartRoute = new CartRoute();
    private product_route: ProductsRoute = new ProductsRoute();
    private user_route: UserRoutes = new UserRoutes();
    
    public static bootstrap(): Server {
        return new Server();
    }
    
    constructor() {
        this.server = express();
        this.config();
        this.sesssion_route.routes(this.server);
        this.cart_route.routes(this.server)
        this.product_route.routes(this.server)
        this.user_route.routes(this.server)
        
    }
    
    public config(): void{
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(router);
    }
}   

export default new Server().server; 
export { router };
