import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";
import fs from "fs-extra";

import CategoriesModel from '../../categories/models/categories.models';

export const multerConfig: multer.Multer = multer({
    storage: multer.diskStorage({
        destination: async (request, file, callback): Promise<void> => {

            const category = await CategoriesModel.findById(request.body.idCategory);

            if(category != null) {
                const dir: string = `uploads/${category.name}`.replace(/ /g, '_');
                const dirExists = await fs.pathExists(dir);

                if(!dirExists) {
                    return await fs.mkdir(dir, (error: Error) => {callback(error, dir)});
                }

                return callback(null, dir);
            }
            else {
                return callback(new Error("Category not found."), "uploads");
            }
        },
        filename: (request, file, callback): void => {
            const extencion: string = path.extname(file.originalname);
            
            if(extencion == '.mp4' || extencion == '.mov' || extencion == '.ogv' || extencion == '.webm') {
                return callback(null, uuid() + path.extname(file.originalname))
            }
            else {
                return callback(new Error(`No support '${extencion}' format`), "none");
            }
        }
    })
    //Limits size here in bytes
});