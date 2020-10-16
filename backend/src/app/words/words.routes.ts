import { Router } from "express";
import { multerConfig } from "@libs/index";

import { wordsController } from "./words.controllers";

class WordsRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {

        //Get list
        this.router.get("/words", wordsController.getWords)

        //Get one
        this.router.get("/word/:id", wordsController.getWord);

        //Post
        this.router.post("/word", [
            multerConfig.fields([
                { name: "conceptVideo", maxCount: 1 },
                { name: "meaningVideo", maxCount: 1 }
            ])
        ], wordsController.createWord);

        //Update
        this.router.put("/word/:id", [
            multerConfig.fields([
                { name: "newConceptVideo", maxCount: 1 },
                { name: "newMeaningVideo", maxCount: 1 }
            ])
        ], wordsController.updateWord);
        
        //Delete
        this.router.delete("/word/:id", wordsController.deleteWord);
    }
}

const wordsRoutes = new WordsRoutes();
export default wordsRoutes.router;