import express, { Router } from 'express';
import { VegetablesRoute } from './routes/vegetables/vegetables-routes';
import cors from 'cors';
import { Session } from 'inspector';
import { SessionRoute } from './routes/session/session-routes';
const router = Router();

class Server {
     public server: express.Application;
     private vegetables_route: VegetablesRoute = new VegetablesRoute();
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
export { router };
