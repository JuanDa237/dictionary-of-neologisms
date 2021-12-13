import { UserModel, User, encryptPassword } from './models/users.models';
import keys from '../keys';

export function createInitialData(): void {
	createUsers();
}

async function createUsers(): Promise<void> {
	const usersLength = await UserModel.countDocuments();

	if (usersLength <= 0) {
		const users: User[] = keys.initialData.users as User[];

		for (const user of users) {
			await new UserModel({
				username: user.username,
				password: await encryptPassword(user.password),
				name: user.name,
				role: user.role
			}).save();
		}

		console.log('Initial users created.');
	}
}
