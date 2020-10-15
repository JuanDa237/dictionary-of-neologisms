import { Request, Response } from "express";

class CategoriesController {
    
    //Get all
    public getCategories(request: Request, response: Response): Response {
        return response.status(200).json({ message: "" });
    }

    //Create
    public createCategory(request: Request, response: Response): Response {
        return response.status(200).json({ message: "" });
    }
}

export const categoriesController = new CategoriesController();