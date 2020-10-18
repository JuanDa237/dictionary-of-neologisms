import { Router } from "express";
import { multerConfig } from "./middlewares";
import { authJwt } from "../auth/middlewares/index";
import { wordsMiddlewares } from "./middlewares/index";

import { wordsControllers } from "./words.controllers";

class WordsRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {

        //Get list
        this.router.get("/words", wordsControllers.getVisibleWords)
        this.router.get("/me/words", [authJwt.verifyToken, authJwt.isLogogenist], wordsControllers.getMeWords)

        //Get one
        this.router.get("/word/:id", wordsControllers.getWord);

        //Post
        this.router.post("/word", [ authJwt.verifyToken, authJwt.isLogogenist,
            multerConfig.fields([
                { name: "conceptVideo", maxCount: 1 },
                { name: "meaningVideo", maxCount: 1 }
            ])
        ], wordsControllers.createWord);

        //Update
        this.router.put("/word/:id", [ authJwt.verifyToken, wordsMiddlewares.isLogogenistAndTheirWord,
            multerConfig.fields([
                { name: "newConceptVideo", maxCount: 1 },
                { name: "newMeaningVideo", maxCount: 1 }
            ])
        ], wordsControllers.updateWord);
        
        //Delete
        this.router.delete("/word/:id", [authJwt.verifyToken, wordsMiddlewares.isLogogenistAndTheirWord], wordsControllers.deleteWord);
    }
}

const wordsRoutes = new WordsRoutes();
export default wordsRoutes.router;