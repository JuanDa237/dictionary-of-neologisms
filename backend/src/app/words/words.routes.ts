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
        this.router.post("/word", multerConfig.array("videos", 2), wordsController.createWord);
    }
}

const wordsRoutes = new WordsRoutes();
export default wordsRoutes.router;