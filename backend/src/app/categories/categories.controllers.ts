import { Request, Response } from "express";
import CategoryModel, { Category, categorySelectFields } from "./models/categories.models";
import WordModel from "../words/models/words.models";

class CategoriesControllers {
    
    //Get all
    public async getCategories(request: Request, response: Response): Promise<Response> {
        
        const categories: Category[] = await CategoryModel.find({ active: true }, categorySelectFields);

        return response.status(200).json(categories);
    }

    //Get one
    public async getCategory(request: Request, response: Response): Promise<Response> {
        const category = await CategoryModel.find({ _id: request.params.id, active: true }, categorySelectFields);
        
        if(category.length != 0) {
            return response.status(200).json(category[0]);
        }
        else {
            return response.status(404).json({ message: "Not found." });
        }
    }

    //Post
    public async createCategory(request: Request, response: Response): Promise<Response> {
        
        await new CategoryModel({
            name: request.body.name
        }).save();

        return response.status(200).json({ message: "Saved category." });
    }

    //Update
    public async updateCategory(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name } = request.body;

        await CategoryModel.findByIdAndUpdate(id, {
            name
        })

        return response.status(200).json({ message: "Updated category." });
    }

    //Delete
    public async deleteCategory(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        Promise.all([
            CategoryModel.findByIdAndUpdate(id, {
                active: false
            }),
            (await WordModel.find({ active: true, idCategory: id }, "_id")).forEach(async word => {
                
                await WordModel.findByIdAndUpdate(word._id, {
                    active: false
                });
            })
        ]);
        
        return response.status(200).json({ message: "Deleted category." });
    }
}

export const categoriesControllers = new CategoriesControllers();