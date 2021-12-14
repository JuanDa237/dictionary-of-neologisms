import { Router } from 'express';

import { authControllers } from './auth.controllers';
import { authJwt } from './middlewares/index';

class AuthRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		//Post
		this.router.post('/singIn', authControllers.singIn);
		this.router.post('/singUp', [authJwt.isAdmin], authControllers.singUp);
	}
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
