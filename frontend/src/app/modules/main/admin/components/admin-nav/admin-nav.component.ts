import { Component, OnInit } from '@angular/core';

import { NavItem } from '../../models';
import { navItems } from '../../data';

import { User, createEmptyUser } from '@modules/main/navigation/models';
import { UsersService } from '@modules/main/navigation/services';
import { AuthService } from '@modules/main/landing/services';

@Component({
	selector: 'app-admin-nav',
	templateUrl: './admin-nav.component.html'
})
export class AdminNavComponent implements OnInit {
	public user: User;
	public navItems: NavItem[];

	constructor(private authService: AuthService, private usersService: UsersService) {
		this.user = createEmptyUser();
		this.navItems = navItems;
	}

	ngOnInit(): void {
		this.getUser();
	}

	private getUser(): void {
		this.usersService.getUser().subscribe((resolve) => {
			this.user = resolve;
			this.actualizeNavItems();
		});
	}

	private actualizeNavItems(): void {
		this.navItems = [];

		navItems.forEach((item) => {
			item.roles.forEach((role) => {
				if (this.user.role == role) this.navItems.push(item);
			});
		});
	}

	//Html methods
	public logOut(): void {
		this.authService.logOut(true);
	}
}
