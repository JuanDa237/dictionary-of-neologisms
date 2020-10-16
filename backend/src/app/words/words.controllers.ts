import { Request, Response } from "express";
import WordModel, { Word } from "./models/words.models";

class WordsController {

    //Get list
    public async getWords(request: Request, response: Response): Promise<Response> {

        const words: Word[] = await WordModel.find({ active: true }, "_id idCategory word definition conceptVideo meaningVideo visible updatedAt");

        return response.status(200).json(words);
    }

    //Get One
    public async getWord(request: Request, response: Response): Promise<Response> {
        
        const word = await WordModel.find({ _id: request.params.id, active: true }, "_id idCategory word definition conceptVideo meaningVideo visible updatedAt");
        
        if(word.length != 0) {
            return response.status(200).json(word[0]);
        }
        else {
            return response.status(404).json({ message: "Not found" });
        }
    }

    //Post
    public async createWord(request: Request, response: Response): Promise<Response> {
        const { idCategory, word, definition, visible } = request.body;
        const { conceptVideo, meaningVideo } = request.files as { [fieldname: string]: Express.Multer.File[] };

        await new WordModel({
            idCategory,
            word,
            definition,
            visible,
            conceptVideo: typeof conceptVideo != "undefined" ? conceptVideo[0].path : '',
            meaningVideo: typeof meaningVideo != "undefined" ? meaningVideo[0].path : ''
        }).save();

        return response.status(200).json({ message: "Saved word." });
    }

    //Update
    public async updateWord(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { idCategory, word, definition, visible, conceptVideo, meaningVideo } = request.body;
        const { newConceptVideo, newMeaningVideo } = request.files as { [fieldname: string]: Express.Multer.File[] };

        const fisrtVideo: any = typeof newConceptVideo != "undefined" ? newConceptVideo[0].path : conceptVideo;
        const secondVideo: any = typeof newMeaningVideo != "undefined" ? newMeaningVideo[0].path : meaningVideo;

        await WordModel.findByIdAndUpdate(id, {
            idCategory,
            word,
            definition,
            visible,
            conceptVideo: fisrtVideo,
            meaningVideo: secondVideo
        });

        return response.status(200).json({ message: "Updated word." });
    }

    //Delete
    public async deleteWord(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        await WordModel.findByIdAndUpdate(id, {
            active: false
        });
        
        return response.status(200).json({ message: "Deleted word." });
    }
}

export const wordsController = new WordsController();