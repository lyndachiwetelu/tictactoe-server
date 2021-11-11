import { Request, Response } from "express";
import { BoardPlay } from "./BoardPlay";
import { BoardValidator } from "./BoardValidator";

export class BoardController {
    public static getBoard(req: Request, res: Response): void {
        let board = req.query.board as string;
        const validator = new BoardValidator(board);
        if (!validator.isValid()) {
            res.sendStatus(400)
            return
        }

        const boardPlay = new BoardPlay(board);
        res.status(200).send(boardPlay.doPlay());
    }

}