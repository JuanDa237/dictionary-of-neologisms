import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { CategoryModel, categoryFields } from './models/categories.models';
import { WordModel } from '../words/models/words.models';

class CategoriesControllers {
	// Get all
	public async getCategories(request: Request, response: Response): Promise<Response> {
		const categories = await CategoryModel.find({ active: true }, categoryFields);

		return response.status(200).json(categories);
	}

	// Get one
	public async getCategory(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		if (!isValidObjectId(id))
			return response.status(400).json({ message: 'Invalid ObjectId.' });

		const category = await CategoryModel.findOne({ _id: id, active: true }, categoryFields);

		if (category != null) {
			return response.status(200).json(category);
		} else {
			return response.status(404).json({ message: 'Not found.' });
		}
	}

	// Post
	public async createCategory(request: Request, response: Response): Promise<Response> {
		const newCategory = new CategoryModel({
			name: request.body.name
		});

		await newCategory.save();

		return response.status(200).json({
			message: 'Saved category.',
			_id: newCategory._id
		});
	}

	// Update
	public async updateCategory(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { name } = request.body;

		if (!isValidObjectId(id))
			return response.status(400).json({ message: 'Invalid ObjectId.' });

		await CategoryModel.findByIdAndUpdate(id, { name });

		return response.status(200).json({ message: 'Updated category.' });
	}

	// Delete
	public async deleteCategory(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		if (!isValidObjectId(id))
			return response.status(400).json({ message: 'Invalid ObjectId.' });

		// Delete category and all words who have that category
		Promise.all([
			CategoryModel.findByIdAndUpdate(id, {
				active: false
			}),
			(await WordModel.find({ active: true, idCategory: id }, '_id')).forEach(
				async (word) => {
					await WordModel.findByIdAndUpdate(word._id, {
						active: false
					});
				}
			)
		]);

		return response.status(200).json({ message: 'Deleted category.' });
	}
}

export const categoriesControllers = new CategoriesControllers();
