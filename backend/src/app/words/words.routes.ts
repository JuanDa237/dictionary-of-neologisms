import { Router } from "express";

import { wordsController } from "./words.controllers";

class WordsRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        this.router.get("/", wordsController.index);
    }
}

const wordsRoutes = new WordsRoutes();
export default wordsRoutes.router;