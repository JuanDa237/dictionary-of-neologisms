import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Role } from '../../navigation/models';

import { UsersService } from '../../navigation/services/user.service';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivate {
	constructor(private usersService: UsersService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
		return this.usersService
			.getUser()
			.toPromise()
			.then((value): boolean => {
				var userRole: string = value.role;
				var routeRoles: Role[] = route.data.roles;

				var canContinue: boolean = false;

				routeRoles.forEach((role) => {
					if (userRole == role) canContinue = true;
				});

				if (!canContinue) this.router.navigate(['/error/401']);

				return canContinue;
			});
	}
}
