import { Roles } from '../roles/data';
import Role from './models/roles.models';

export function createInitialData(): void {
	createRoles();
}

async function createRoles(): Promise<void> {
	const roles = await Role.find();

	if (roles.length <= 0) {
		const logogenistRole = new Role({
			name: Roles.LOGOGENIST
		});

		const administratorRole = new Role({
			name: Roles.ADMINISTRATOR
		});

		await Promise.all([await logogenistRole.save(), await administratorRole.save()]);

		console.log('Roles created.');
	}
}
