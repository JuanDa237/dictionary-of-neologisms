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
                {name: "conceptVideo", maxCount: 1},
                {name: "meaningVideo", maxCount: 1}
            ])
        ], wordsController.createWord);
    }
}

const wordsRoutes = new WordsRoutes();
export default wordsRoutes.router;