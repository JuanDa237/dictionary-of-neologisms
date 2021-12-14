import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import keys from 'server/keys';
import { UserModel, Role, User } from '../../users/models/users.models';

interface Payload {
	_id: string;
	iat: number;
	exp: number;
}

export async function verifyToken(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	try {
		var user = await validUserToken(request);

		if (user != null) {
			request.user = user;
			return next();
		} else {
			return response.status(404).json({ message: 'User not found.' });
		}
	} catch (error) {
		return response.status(401).json({ message: 'Unauthorized.' });
	}
}

export async function validUserToken(request: Request): Promise<User | null> {
	var user: User | null = null;

	const token = request.header('Authorization')?.split(' ')[1];

	if (!token) return user;

	const payload = jwt.verify(token, process.env.TOKEN_SECRET || keys.TOKEN_SECRET) as Payload;

	const users = await UserModel.find({ _id: payload._id });

	if (users.length > 0) user = users[0];

	return user;
}

export async function isAdmin(request: Request, response: Response, next: NextFunction) {
	return await verifyToken(request, response, async function () {
		const role = request.user.role;

		if (role == Role.ADMIN) {
			return next();
		} else {
			return response.status(401).json({ message: 'Unauthorized.' });
		}
	});
}

export async function isLogogenist(request: Request, response: Response, next: NextFunction) {
	return await verifyToken(request, response, async function () {
		const role = request.user.role;

		if (role == Role.ADMIN || role == Role.LOGOGENIST) {
			return next();
		} else {
			return response.status(401).json({ message: 'Unauthorized.' });
		}
	});
}
