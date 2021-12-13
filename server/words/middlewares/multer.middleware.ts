import * as multer from 'multer';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import * as fs from 'fs-extra';

import CategoriesModel from '../../categories/models/categories.models';

export const multerConfig: multer.Multer = multer({
	storage: multer.diskStorage({
		destination: async (request, file, callback): Promise<void> => {
			const category = await CategoriesModel.findById(request.body.idCategory);

			if (category != null) {
				const dir: string = `uploads/${category.name}`.replace(/ /g, '_');

				if (!(await fs.pathExists(dir))) {
					return await fs.mkdir(dir, { recursive: true }, (error: Error) => {
						return callback(error, dir);
					});
				}

				return callback(null, dir);
			} else {
				return callback(new Error('Category not found.'), 'uploads');
			}
		},
		filename: (request, file, callback): void => {
			const extencion: string = path.extname(file.originalname);

			if (extencion.match(/\.(mp4|mov|ogv|webm)$/)) {
				return callback(null, uuid() + extencion);
			} else {
				return callback(new Error(`No support '${extencion}' format`), '');
			}
		}
	})
	//Limits size here in bytes
});
