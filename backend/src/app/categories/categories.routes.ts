import { Router } from "express";

import { categoriesController } from "./categories.controllers";

class CategoriesRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        //Get list
        this.router.get("/categories", categoriesController.getCategories);

        //Get one
        this.router.get("/category/:id", categoriesController.getCategory);

        //Post
        this.router.post("/category", categoriesController.createCategory);
        
        //Update
        this.router.put("/category/:id", categoriesController.updateCategory);
        
        //Delete
        this.router.delete("/category/:id", categoriesController.deleteCategory);
    }
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;