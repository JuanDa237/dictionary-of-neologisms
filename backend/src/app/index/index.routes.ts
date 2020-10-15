import { Router } from "express";

import { indexController } from "./index.controllers";

class IndexRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        this.router.get("/", indexController.index);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;