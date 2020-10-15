import { Request, Response } from "express";

class WordsController {
    
    public index(request: Request, response: Response): Response {
        return response.json({ message: "" });
    }
}

export const wordsController = new WordsController();