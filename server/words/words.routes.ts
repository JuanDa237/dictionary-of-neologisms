import { Router } from 'express';

import { multerConfig } from './middlewares';
import { authJwt } from '../auth/middlewares/index';
import { wordsMW } from './middlewares/index';
import { wordsControllers } from './words.controllers';

class WordsRoutes {
	constructor(public router: Router = Router()) {
		this.routes();
	}

	routes(): void {
		// Get list
		this.router.get('/words', wordsControllers.getVisibleWords);
		this.router.get('/words/all', [wordsMW.isAdminOrLogogenist], wordsControllers.getWords);
		this.router.get('/me/words', [authJwt.isLogogenist], wordsControllers.getMeWords);

		// Get one
		this.router.get('/word/visible/:id', wordsControllers.getVisibleWord);
		this.router.get('/word/:id', [authJwt.isLogogenist], wordsControllers.getWord);

		// Post
		this.router.post(
			'/word',
			[
				authJwt.isLogogenist,
				multerConfig.fields([
					{ name: 'conceptVideo', maxCount: 1 },
					{ name: 'meaningVideo', maxCount: 1 }
				])
			],
			wordsControllers.createWord
		);

		// Update
		this.router.put(
			'/word/:id',
			[
				wordsMW.isLogogenistAndHisWord,
				multerConfig.fields([
					{ name: 'conceptVideo', maxCount: 1 },
					{ name: 'meaningVideo', maxCount: 1 }
				])
			],
			wordsControllers.updateWord
		);

		// Delete
		this.router.delete(
			'/word/:id',
			[wordsMW.isLogogenistAndHisWord],
			wordsControllers.deleteWord
		);
	}
}

const wordsRoutes = new WordsRoutes();
export default wordsRoutes.router;
