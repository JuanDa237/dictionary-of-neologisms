//For the path aliases
import 'module-alias/register';

//Express
import express, { Application } from "express";
import morgan from "morgan";
import path from "path";

//Database
import { startConnection } from "./database";

//Routes
import indexRoutes from "./app/index/index.routes";
import categoriesRoutes from "./app/categories/categories.routes";
import wordsRoutes from "./app/words/words.routes";

class Server {
    
    private app: Application;

    constructor() {
        this.app = express();
        this.configExpress();
        this.routes();
        this.initialConfig();
    }

    private configExpress(): void {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    private routes(): void {
        this.app.use("/", indexRoutes);
        this.app.use("/api/uploads", express.static(path.resolve('uploads')));
        this.app.use("/api", categoriesRoutes);
        this.app.use("/api", wordsRoutes);
    }

    private initialConfig(): void {
        
        startConnection();
    }

    public async start(): Promise<any> {
        await this.app.listen(this.app.get("port"));
        console.log("Server on port " + this.app.get("port"));
    }
}

const server = new Server();
server.start();