import { Request, Response, NextFunction } from 'express';
import { Role } from '../../roles/models';

import UsersModel from '../../users/models/users.models';
import WordsModel from '../models/words.models';

export async function isLogogenistAndTheirWord(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	const role = request.user.role;

	if (role != null) {
		switch (role.name) {
			case Role.ADMINISTRATOR:
				return next();
			case Role.LOGOGENIST:
				const { id } = request.params;
				const user = await UsersModel.find({ active: true, _id: request.user._id }, '_id');

				const word = await WordsModel.find({ _id: id, idUser: user[0]._id }, '_id');

				if (word.length > 0) {
					return next();
				} else {
					return response.status(401).json({ message: 'Unauthorized.' });
				}
			default:
				return response.status(401).json({ message: 'Unauthorized.' });
		}
	} else {
		return response.status(401).json({ message: 'Unauthorized.' });
	}
}
