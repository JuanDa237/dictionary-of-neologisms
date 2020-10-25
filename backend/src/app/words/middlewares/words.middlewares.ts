import { Request, Response, NextFunction } from 'express';

import { Roles } from '../../roles/data/index';
import RolesModel from '../../roles/models/roles.models';
import UsersModel from '../../users/models/users.models';
import WordsModel from '../models/words.models';

export async function isLogogenistAndTheirWord(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	const role = await RolesModel.findById(request.user.idRole);

	if (role != null) {
		switch (role.name) {
			case Roles.ADMINISTRATOR:
				return next();
			case Roles.LOGOGENIST:
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
