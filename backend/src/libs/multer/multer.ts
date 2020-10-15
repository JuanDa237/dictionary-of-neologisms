import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

export const multerConfig: multer.Multer = multer({
    storage: multer.diskStorage({
        destination: 'uploads',
        filename: (request, file, callback) => {
            callback(null, uuid() + path.extname(file.originalname))
        }
    })
});