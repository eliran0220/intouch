import express, {Express} from 'express';
import cors from 'cors';
import dotenv  from 'dotenv';
import * as utilities from '../utilities/common.utils';
import * as process from "process";
import {addIDToRequest} from '../middlewares/operationId.middleware';
class App {
    private readonly app : Express;
    constructor() {
        this.app = express();
        this.initMiddlewares();
        this.initRoutes();
        dotenv.config({path:'./.env'});
        console.log(process.env.APP_PORT)
    }

    initMiddlewares() : void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(addIDToRequest);
    }
    
    initRoutes() : void {
        for (const route of utilities.routes) {
            const {method, url, action, controller} = route;
            console.log(route)
            const Controller = utilities.controllersMapping[controller];
            this.app.route(url)[method](Controller[action]);
        }
    }

    get appInstance(): Express {
        return this.app;
    }

    startServer() : void {
        this.app.listen( process.env.APP_PORT, () => {
            console.log( `server started at http://localhost:${process.env.APP_PORT}` );
        } );
    }
}

const instance = new App();
export default instance;
