import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

import { verifyToken } from 'server/auth/middlewares/auth.middlewares';
import { Role } from '../../users/models/users.models';
import { WordModel } from '../models/words.models';

export async function isLogogenistAndHisWord(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	return await verifyToken(request, response, async function () {
		const role = request.user.role;

		switch (role) {
			case Role.ADMIN:
				return next();
			case Role.LOGOGENIST:
				const { id } = request.params;

				if (!isValidObjectId(id))
					return response.status(400).json({ message: 'Invalid ObjectId.' });

				const word = (
					await WordModel.find({ _id: id, idUser: request.user._id }, '_id')
				)[0];

				if (word != null) {
					return next();
				} else {
					return response.status(401).json({ message: "The word isn't yours." });
				}
			default:
				return response.status(401).json({ message: 'Role not found.' });
		}
	});
}

export async function isAdminOrLogogenist(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	return await verifyToken(request, response, async function () {
		const role: string = request.user.role;

		if (role == Role.ADMIN) {
			return next();
		} else if (role == Role.LOGOGENIST) {
			response.redirect('/api/me/words');
		} else {
			return response.status(401).json({ message: 'Unauthorized.' });
		}
	});
}
