import { Request, Response } from 'express';

import WordModel, { wordSelectFields } from './models/words.models';
import CategoriesModel from '../categories/models/categories.models';
import UsersModel, { Role } from '../users/models/users.models';

class WordsControllers {
	//Get list
	public async getVisibleWords(request: Request, response: Response): Promise<Response> {
		const words = await WordModel.find({ active: true, visible: true }, wordSelectFields);

		return response.status(200).json(words);
	}

	public async getWords(request: Request, response: Response): Promise<Response> {
		const words = await WordModel.find({ active: true }, wordSelectFields);

		return response.status(200).json(words);
	}

	public async getMeWords(request: Request, response: Response): Promise<Response> {
		const words = await WordModel.find(
			{ active: true, idUser: request.user._id },
			wordSelectFields
		);

		return response.status(200).json(words);
	}

	//Get One
	public async getVisibleWord(request: Request, response: Response): Promise<Response> {
		const word = await WordModel.find(
			{ _id: request.params.id, active: true, visible: true },
			wordSelectFields
		);

		if (word.length != 0) {
			return response.status(200).json(word[0]);
		} else {
			return response.status(404).json({ message: 'Not found.' });
		}
	}

	public async getWord(request: Request, response: Response): Promise<Response> {
		const word = await WordModel.find(
			{ _id: request.params.id, active: true },
			wordSelectFields
		);

		if (word.length != 0) {
			return response.status(200).json(word[0]);
		} else {
			return response.status(404).json({ message: 'Not found.' });
		}
	}

	//Post
	public async createWord(request: Request, response: Response): Promise<Response> {
		const { idCategory, word, definition } = request.body;
		var visible = request.body.visible;
		const { conceptVideo, meaningVideo } = request.files as {
			[fieldname: string]: Express.Multer.File[];
		};
		const userRole = request.user.role;

		const category = await CategoriesModel.find({ active: true, _id: idCategory }, '_id');
		const user = await UsersModel.find({ active: true, _id: request.user._id }, '_id');

		if (category.length > 0 && user.length > 0) {
			if (userRole == Role.LOGOGENIST) visible = undefined;

			try {
				const newWord = new WordModel({
					idUser: user[0]._id,
					idCategory,
					word,
					definition,
					visible,
					conceptVideo: typeof conceptVideo != 'undefined' ? conceptVideo[0].path : '',
					meaningVideo: typeof meaningVideo != 'undefined' ? meaningVideo[0].path : ''
				});

				await newWord.save();

				return response.status(200).json({ message: 'Saved word.', _id: newWord._id });
			} catch (error) {
				return response
					.status(500)
					.json({ message: 'Server error, ¿No provide conceptVideo?.' });
			}
		} else if (category.length <= 0 && user.length > 0) {
			return response.status(404).json({ message: 'Category not found.' });
		} else if (category.length > 0 && user.length <= 0) {
			return response.status(404).json({ message: 'User not found.' });
		} else {
			return response.status(404).json({ message: 'User and category not found.' });
		}
	}

	//Update
	public async updateWord(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { idCategory, word, definition } = request.body;
		var visible = request.body.visible;
		const { conceptVideo, meaningVideo } = request.files as {
			[fieldname: string]: Express.Multer.File[];
		};
		const userRole = request.user.role;

		const oldWord = await WordModel.findById(id, 'conceptVideo meaningVideo');
		const category = await CategoriesModel.find({ active: true, _id: idCategory }, '_id');

		if (category.length > 0 && oldWord != null) {
			if (userRole == Role.LOGOGENIST) visible = undefined;

			await WordModel.findByIdAndUpdate(id, {
				idCategory,
				word,
				definition,
				visible,
				conceptVideo:
					typeof conceptVideo != 'undefined'
						? conceptVideo[0].path
						: oldWord.conceptVideo,
				meaningVideo:
					typeof meaningVideo != 'undefined' ? meaningVideo[0].path : oldWord.meaningVideo
			});

			return response.status(200).json({ message: 'Updated word.' });
		} else if (oldWord == null) {
			return response.status(404).json({ message: 'Word not found.' });
		} else {
			return response.status(404).json({ message: 'Category not found.' });
		}
	}

	//Delete
	public async deleteWord(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		await WordModel.findByIdAndUpdate(id, {
			active: false
		});

		return response.status(200).json({ message: 'Deleted word.' });
	}
}

export const wordsControllers = new WordsControllers();
