import { Request, Response } from "express";
import CategoryModel, { Category } from "./models/categories.models";

class CategoriesController {
    
    //Get all
    public async getCategories(request: Request, response: Response): Promise<Response> {
        
        const categories: Category[] = await CategoryModel.find();

        return response.status(200).json({ categories });
    }

    //Create
    public async createCategory(request: Request, response: Response): Promise<Response> {
        
        await new CategoryModel({
            name: request.body.name
        }).save();

        return response.status(200).json({ message: "Saved category." });
    }
}

export const categoriesController = new CategoriesController();