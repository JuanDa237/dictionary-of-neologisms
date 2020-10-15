import { Request, Response } from "express";
import WordModel, { Word } from "./models/words.models";

class WordsController {
    
    //Get all
    public async getWords(request: Request, response: Response): Promise<Response> {
        
        const words: Word[] = await WordModel.find();

        return response.status(200).json(words);
    }

    //Get One
    public async getWord(request: Request, response: Response): Promise<Response> {
        const word = await WordModel.findById(request.params.id);
        return response.status(200).json(word);
    }

    public async createWord(request: Request, response: Response): Promise<Response> {
        const { idCategory, word, definition, visible } = request.body;
        const { conceptVideo, meaningVideo } = request.files as { [fieldname: string]: Express.Multer.File[] };

        await new WordModel({
            idCategory: idCategory,
            word: word,
            definition: definition,
            visible: visible,
            conceptVideo: typeof conceptVideo != "undefined" ? conceptVideo[0].path : '',
            meaningVideo: typeof meaningVideo != "undefined" ? meaningVideo[0].path : ''
        }).save();

        return response.status(200).json({ message: "Saved word." });
    }
}

export const wordsController = new WordsController();