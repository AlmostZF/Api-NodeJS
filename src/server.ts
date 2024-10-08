import express, { Router } from 'express';
import cors from 'cors';
import { SessionRoute } from './routes/session-routes';
import { ProductsRoute } from './routes/products-routes';
const router = Router();

class Server {
    public server: express.Application;
    private vegetables_route: ProductsRoute = new ProductsRoute();
    private sesssion_route: SessionRoute = new SessionRoute();
    
    public static bootstrap(): Server {
        return new Server();
    }
    
    constructor() {
        this.server = express();
        this.config();
        this.vegetables_route.routes(this.server);
        this.sesssion_route.routes(this.server);
    }
    
    public config(): void{
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(router);
    }
}   

export default new Server().server; 
export { router};
