import { NavItem } from '../models';
import { Role } from '../../navigation/models';

export const navItems: NavItem[] = [
	{
		icon: 'fa-stream',
		text: 'Categorias',
		link: '/admin/categories',
		roles: [Role.ADMINISTRATOR]
	},
	{
		icon: 'fa-sort-alpha-down',
		text: 'Palabras',
		link: '/admin/words',
		roles: [Role.ADMINISTRATOR, Role.LOGOGENIST]
	}
];
