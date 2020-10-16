import { Router } from "express";

import { categoriesControllers } from "./categories.controllers";

class CategoriesRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        //Get list
        this.router.get("/categories", categoriesControllers.getCategories);

        //Get one
        this.router.get("/category/:id", categoriesControllers.getCategory);

        //Post
        this.router.post("/category", categoriesControllers.createCategory);
        
        //Update
        this.router.put("/category/:id", categoriesControllers.updateCategory);
        
        //Delete
        this.router.delete("/category/:id", categoriesControllers.deleteCategory);
    }
}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;