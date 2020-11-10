import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import UsersModel, { userSelectFields } from '../../users/models/users.models';
import { Role } from '../../roles/models';

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
		const token = request.header('Authorization')?.split(' ')[1];

		if (!token) return response.status(403).json({ message: 'No token provided.' });

		const payload: Payload = jwt.verify(
			token,
			process.env.TOKEN_SECRET || 'tokentest'
		) as Payload;

		const user = await UsersModel.find({ _id: payload._id, active: true }, userSelectFields);

		if (user.length > 0) {
			request.user = user[0];
			return next();
		} else {
			return response.status(404).json({ message: 'User not found.' });
		}
	} catch (error) {
		return response.status(401).json({ message: 'Unauthorized.' });
	}
}

export async function isLogogenist(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	const role: string = request.user.role;

	if (
		role != null &&
		(role == Role.SUPERADMIN || role == Role.ADMINISTRATOR || role == Role.LOGOGENIST)
	) {
		return next();
	} else {
		return response.status(401).json({ message: 'Unauthorized.' });
	}
}

export async function isAdministrator(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	const role: string = request.user.role;

	if (role != null && (role == Role.SUPERADMIN || role == Role.ADMINISTRATOR)) {
		return next();
	} else {
		return response.status(401).json({ message: 'Unauthorized.' });
	}
}

export async function isSuperadmin(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void | Response> {
	const role: string = request.user.role;

	if (role != null && role == Role.SUPERADMIN) {
		return next();
	} else {
		return response.status(401).json({ message: 'Unauthorized.' });
	}
}
