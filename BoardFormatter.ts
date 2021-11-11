import { BOARD_DIMENSION, EMPTY_CELL_MAP_VALUE, OPPONENT_PLAYER, OPPONENT_PLAYER_MAP_VALUE, OUR_PLAYER, OUR_PLAYER_MAP_VALUE } from "./constants";

export class BoardFormatter {
    board: number[][];

    constructor(board: string) {
        this.board = this.mapBoardToNumbers(board);
    }

    getFormattedBoard(): number[][] {
        return this.board
    }

    mapBoardToNumbers(board:string): Array<number[]> {
        const boardArray = board.split('').map(char => char === OPPONENT_PLAYER ? OPPONENT_PLAYER_MAP_VALUE : char === OUR_PLAYER ? OUR_PLAYER_MAP_VALUE : EMPTY_CELL_MAP_VALUE);
        return this.convertBoardTo3X3Array(boardArray.join(','));
    }

    convertBoardTo3X3Array(board: string): Array<number[]> {
        const boardArray = board.split(',');
        const boardMap = [];
        for (let i = 0; i < 3; i++) {
            boardMap.push(boardArray.slice(i * BOARD_DIMENSION, i * BOARD_DIMENSION + BOARD_DIMENSION).map(char => parseInt(char)));
        }
        return boardMap;
    }

    getOriginalBoardString(char: number): string {
        switch (char) {
            case 1:
                return OUR_PLAYER;
            case -1:
                return OPPONENT_PLAYER;
            default:
                return ' ';
        }
    }

    convert3X3BoardArrayToString(): string {
        let boardString = "";
        for (let i = 0; i < this.board.length; i++) {
            boardString += this.board[i].map(char => this.getOriginalBoardString(char)).join('');
        }

        return boardString;
    }
}