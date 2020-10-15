import { Router } from "express";

import { categoriesController } from "./categories.controllers";

class CategoriesRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        this.router.get("/categories", categoriesController.getCategories);
        this.router.post("/category", categoriesController.createCategory);
    }
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;