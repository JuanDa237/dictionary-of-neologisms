export enum Role {
	LOGOGENIST = 'logogenist',
	ADMINISTRATOR = 'administrator',
	SUPERADMIN = 'superadmin'
}

export interface User {
	name: string;
	role: string;
}

export function createEmptyUser(): User {
	return {
		name: '',
		role: ''
	} as User;
}

export interface RouteData {
	title: string;
	roles: Role[];
}
