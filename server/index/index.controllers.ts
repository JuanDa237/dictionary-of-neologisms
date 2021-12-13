import { Request, Response } from 'express';
import * as path from 'path';

import { getFileStream } from 'server/words/functions';

class IndexController {
	public index(request: Request, response: Response): Response {
		return response.json({
			message: 'Welcome to the API Dictionary Of Neologism.'
		});
	}

	public async getVideo(request: Request, response: Response) {
		const key = request.params.key;
		const ext = path.extname(key);

		if (key == 'undefined' || !ext.match(/\.(mp4|mov|ogv|webm)$/))
			return response.status(400).json({ message: 'No valid key.' });

		if (process.env.NODE_ENV == 'development')
			return response.download(`uploads/videos/${key}`);

		const read = await getFileStream(key);

		if (read != null) return read.pipe(response);
		else return response.status(404).json({ message: 'Not Found' });
	}
}

export const indexController = new IndexController();
