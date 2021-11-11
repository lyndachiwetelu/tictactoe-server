import { Request, Response, Router } from 'express';
import { BoardController } from './BoardController';

export class Routes {
    router: Router;

    constructor() {
        this.router = Router();
    }

    public setupRoutes() {
        this.router.get('', BoardController.getBoard);
        return this.router;
    }

}