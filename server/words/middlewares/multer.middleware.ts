import * as multer from 'multer';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import * as fs from 'fs-extra';

export type mFiles = { [fieldname: string]: Express.Multer.File[] };
export type mFile = Express.Multer.File;

export const multerConfig: multer.Multer = multer({
	storage: multer.diskStorage({
		destination: async (request, file, callback): Promise<void> => {
			const dir: string = 'uploads/videos';

			if (!(await fs.pathExists(dir))) {
				return await fs.mkdir(dir, { recursive: true }, (error: Error) => {
					return callback(error, dir);
				});
			}

			return callback(null, dir);
		},
		filename: (request, file, callback): void => {
			const extencion: string = path.extname(file.originalname);

			if (extencion.match(/\.(mp4|mov|ogv|webm)$/)) {
				return callback(null, uuid() + extencion);
			} else {
				return callback(new Error(`No support '${extencion}' format`), '');
			}
		}
	}),
	limits: {
		// fileSize: 10 * 1024 * 1024
	}
});
