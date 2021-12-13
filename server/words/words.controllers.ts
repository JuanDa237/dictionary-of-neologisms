import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { WordModel, wordFields, Word } from './models/words.models';
import { CategoryModel } from '../categories/models/categories.models';
import { Role } from '../users/models/users.models';
import { uploadFile } from './functions';
import { mFile, mFiles } from './middlewares/multer.middleware';

class WordsControllers {
	// Get list
	public async getVisibleWords(request: Request, response: Response): Promise<Response> {
		const words = await WordModel.find({ active: true, visible: true }, wordFields);

		return response.status(200).json(words);
	}

	public async getWords(request: Request, response: Response): Promise<Response> {
		const words = await WordModel.find({ active: true }, wordFields);

		return response.status(200).json(words);
	}

	public async getMeWords(request: Request, response: Response): Promise<Response> {
		const words = await WordModel.find({ active: true, idUser: request.user._id }, wordFields);

		return response.status(200).json(words);
	}

	// Get One
	public async getVisibleWord(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		if (!isValidObjectId(id))
			return response.status(400).json({ message: 'Invalid ObjectId.' });

		const word = (
			await WordModel.find({ _id: id, active: true, visible: true }, wordFields)
		)[0];

		if (word != null) {
			return response.status(200).json(word);
		} else {
			return response.status(404).json({ message: 'Not found.' });
		}
	}

	public async getWord(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		if (!isValidObjectId(id))
			return response.status(400).json({ message: 'Invalid ObjectId.' });

		const word = (await WordModel.find({ _id: id, active: true }, wordFields))[0];

		if (word != null) {
			return response.status(200).json(word);
		} else {
			return response.status(404).json({ message: 'Not found.' });
		}
	}

	// Post
	public async createWord(request: Request, response: Response): Promise<Response> {
		var word = request.body as Word;
		word.idUser = request.user._id;

		if (!isValidObjectId(word.idCategory))
			return response.status(400).json({ message: 'Invalid category ObjectId.' });

		// Just admin can set if is visible
		if (request.user.role != Role.ADMIN) word.visible = false;

		try {
			const newWord = new WordModel(word);
			await newWord.save();

			word._id = newWord._id;
		} catch (error) {
			return response.status(400).json({ message: `Can't save word.\n${error}` });
		}

		// Get uploaded video
		const videos = request.files as mFiles;
		var conceptVideo: mFile | undefined = undefined;
		var meaningVideo: mFile | undefined = undefined;

		if (videos.conceptVideo?.length > 0) conceptVideo = videos.conceptVideo[0];
		if (videos.meaningVideo?.length > 0) meaningVideo = videos.meaningVideo[0];

		// Upload to S3
		try {
			if (conceptVideo != null) word.conceptVideo = await uploadFile(conceptVideo);
			if (meaningVideo != null) word.meaningVideo = await uploadFile(meaningVideo);
		} catch (error: any) {
			// If error, delete word
			await WordModel.findByIdAndDelete(word._id);
			return response.status(400).json({ message: `Can't save videos. ${error.message}` });
		}

		await WordModel.findByIdAndUpdate(
			word._id,
			{ conceptVideo: word.conceptVideo, meaningVideo: word.meaningVideo },
			{ omitUndefined: true }
		);

		return response.status(200).json({ message: 'Word saved.', _id: word._id });
	}

	// Update
	public async updateWord(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		var word = request.body as Word;
		word.idUser = request.user._id;

		if (id != word._id) word._id = id;

		if (!isValidObjectId(word.idCategory))
			return response.status(400).json({ message: 'Invalid category ObjectId.' });

		// Visibility
		if (request.user.role == Role.LOGOGENIST) word.visible = undefined;
		else if (request.user.role == Role.ADMIN) word.visible = request.body.visible === 'true';

		const oldWord = await WordModel.findByIdAndUpdate(word._id, word);

		if (oldWord == null)
			return response.status(400).json({ message: 'Word Not Found Or Error.' });

		// Get uploaded videos
		const videos = request.files as mFiles;
		var conceptVideo: mFile | undefined = undefined;
		var meaningVideo: mFile | undefined = undefined;

		if (videos.conceptVideo?.length > 0) conceptVideo = videos.conceptVideo[0];
		if (videos.meaningVideo?.length > 0) meaningVideo = videos.meaningVideo[0];

		try {
			// Upload to S3
			if (conceptVideo != null) word.conceptVideo = await uploadFile(conceptVideo);
			if (meaningVideo != null) word.meaningVideo = await uploadFile(meaningVideo);
		} catch (error: any) {
			// If error, get changes back
			await WordModel.findByIdAndUpdate(word._id, oldWord);
			return response.status(400).json({ message: `Can't save videos. ${error.message}` });
		}

		await WordModel.findByIdAndUpdate(
			word._id,
			{ conceptVideo: word.conceptVideo, meaningVideo: word.meaningVideo },
			{ omitUndefined: true }
		);

		return response.status(200).json({ message: 'Word updated.' });
	}

	// Delete
	public async deleteWord(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		await WordModel.findByIdAndUpdate(id, {
			active: false,
			visible: false
		});

		return response.status(200).json({ message: 'Deleted word.' });
	}
}

export const wordsControllers = new WordsControllers();
