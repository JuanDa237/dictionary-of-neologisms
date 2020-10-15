import { Request, Response } from "express";

class WordsController {
    
    public createWord(request: Request, response: Response): Response {
        console.log(request.body);
        return response.status(200).json({ message: "Word created successfully." });
    }
}

export const wordsController = new WordsController();