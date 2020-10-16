import { Router } from "express";
import { multerConfig } from "@libs/index";

import { wordsControllers } from "./words.controllers";

class WordsRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {

        //Get list
        this.router.get("/words", wordsControllers.getWords)

        //Get one
        this.router.get("/word/:id", wordsControllers.getWord);

        //Post
        this.router.post("/word", [
            multerConfig.fields([
                { name: "conceptVideo", maxCount: 1 },
                { name: "meaningVideo", maxCount: 1 }
            ])
        ], wordsControllers.createWord);

        //Update
        this.router.put("/word/:id", [
            multerConfig.fields([
                { name: "newConceptVideo", maxCount: 1 },
                { name: "newMeaningVideo", maxCount: 1 }
            ])
        ], wordsControllers.updateWord);
        
        //Delete
        this.router.delete("/word/:id", wordsControllers.deleteWord);
    }
}

const wordsRoutes = new WordsRoutes();
export default wordsRoutes.router;