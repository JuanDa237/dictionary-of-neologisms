import { Role } from '../../navigation/models/index';

export interface NavItem {
	icon: string;
	text: string;
	link: string;
	roles: Role[];
}
