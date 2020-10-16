import { Router } from "express";

import { authControllers } from "./auth.controllers";

class AuthRoutes {

    constructor(
        public router: Router = Router()
    ) {
        this.routes();
    }

    routes(): void {
        //Post
        this.router.post("/singIn", authControllers.singIn);
        this.router.post("/singUp", authControllers.singUp);
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;