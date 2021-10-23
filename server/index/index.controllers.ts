import { Request, Response } from 'express';

class IndexController {
	public index(request: Request, response: Response): Response {
		return response.json({
			message: 'Welcome to the API Dictionary Of Neologism.'
		});
	}
}

export const indexController = new IndexController();
