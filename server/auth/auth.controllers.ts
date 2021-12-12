import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Role } from '../users/models/users.models';

import UsersModel, { encryptPassword, validatePassword } from '../users/models/users.models';

class AuthControllers {
	//Post
	public async singIn(request: Request, response: Response): Promise<Response> {
		const { username, password } = request.body;

		const user = await UsersModel.find({ username: username, active: true });

		if (user.length > 0) {
			const correctPassword: boolean = await validatePassword(password, user[0].password);

			if (correctPassword) {
				const token: string = jwt.sign(
					{
						_id: user[0]._id
					},
					process.env.TOKEN_SECRET || 'tokenTest',
					{
						expiresIn: 86400 //The token expires in 24 hours
					}
				);

				return response
					.status(200)
					.header('token', token)
					.set('Access-Control-Expose-Headers', 'token')
					.json({
						name: user[0].name,
						role: user[0].role
					});
			} else {
				return response.status(401).json({ message: 'Password is wrong.' });
			}
		} else {
			return response.status(404).json({ message: 'Username not found.' });
		}
	}

	public async singUp(request: Request, response: Response): Promise<Response> {
		const { username, password, name, role } = request.body;

		// Validate username
		const usernameFound = await UsersModel.find({ username: username });

		if (usernameFound.length > 0) {
			return response.status(401).json({ message: `Username '${username}' is in use.` });
		}

		// Validate role
		if (!(role == Role.SUPERADMIN || role == Role.ADMINISTRATOR || role == Role.LOGOGENIST)) {
			return response.status(400).json({ message: 'No provide a valid role.' });
		}

		// Create user
		const newUser = await new UsersModel({
			username,
			password: await encryptPassword(password),
			name,
			role
		});

		newUser.save();

		return response.status(200).json({
			message: 'Saved user.',
			user: {
				_id: newUser._id,
				username: newUser.username,
				name: newUser.name,
				role: newUser.role
			}
		});
	}
}

export const authControllers = new AuthControllers();
