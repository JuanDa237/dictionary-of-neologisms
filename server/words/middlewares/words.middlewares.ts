import { Request, Response, NextFunction } from 'express';

import UsersModel, { Role } from '../../users/models/users.models';
import WordsModel from '../models/words.models';

export async function isLogogenistAndTheirWord(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	const role = request.user.role;

	switch (role) {
		case Role.SUPERADMIN:
		case Role.ADMINISTRATOR:
			return next();
		case Role.LOGOGENIST:
			const { id } = request.params;
			const user = await UsersModel.find({ active: true, _id: request.user._id }, '_id');

			const word = await WordsModel.find({ _id: id, idUser: user[0]._id }, '_id');

			if (word.length > 0) {
				return next();
			} else {
				return response.status(401).json({ message: "The word isn't yours." });
			}
		default:
			return response.status(401).json({ message: 'Role not found.' });
	}
}

export async function isAdministratorOrLogogenist(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	const role: string = request.user.role;

	if (role != null && (role == Role.SUPERADMIN || role == Role.ADMINISTRATOR)) {
		return next();
	} else if (role != null && role == Role.LOGOGENIST) {
		response.redirect('/api/me/words');
	} else {
		return response.status(401).json({ message: 'Unauthorized.' });
	}
}
