import { Router } from 'express';

import { usersControllers } from './users.controllers';
import { authJwt } from '../auth/middlewares/index';

class UsersRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		//Get logged user
		this.router.get(
			'/user',
			[authJwt.verifyToken, authJwt.isLogogenist],
			usersControllers.loggedUser
		);
	}
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;
