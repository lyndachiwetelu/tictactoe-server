import { BoardFormatter } from "./BoardFormatter";
import { BOARD_DIMENSION, BOARD_SIZE, OPPONENT_PLAYER, OPPONENT_PLAYER_WIN_SUM, OUR_PLAYER, OUR_PLAYER_WIN_SUM } from "./constants";

export class BoardValidator {
    board: string;
    formattedBoard: number[][];

    constructor(board: string) {
        this.board = board;
        if (this.board !== undefined) {
            this.formattedBoard = this.formatBoard();
        } else {
            this.formattedBoard = [];
        }
       
    }

    isValid(): boolean {
        return this.board !== undefined && this.isValidLength() && this.isValidBoard();
    }

    isValidBoard(): boolean {
        return (this.countPlayerCurrentMoves(OUR_PLAYER) === this.countPlayerCurrentMoves(OPPONENT_PLAYER) ||
            this.countPlayerCurrentMoves(OPPONENT_PLAYER) === this.countPlayerCurrentMoves(OUR_PLAYER) + 1) &&
            this.boardHasWinner() === false &&
            this.boardHasEmptyCells() === true &&
            this.boardHasOnlyValidCharacters() === true;
    }

    boardHasOnlyValidCharacters(): boolean {
        return this.board.match(/[^xo ]/g) === null;
    }

    boardHasEmptyCells(): boolean {
        return this.board.indexOf(' ') !== -1;
    }

    checkIfAnyRowsHaveWinner(): boolean {
        return this.formattedBoard.some(row => this.checkIfArrayIsWinning(row));
    }

    checkIfAnyColumnsHaveWinner(): boolean {
        // get all columns of 3x3 board as arrays
        for (let i = 0; i < BOARD_DIMENSION; i++) {
            const column = this.formattedBoard.map(row => row[i]);
            if (this.checkIfArrayIsWinning(column)) {
                return true;
            }
        }
        
        return false;
    }

    checkIfArrayIsWinning(array: number[]): boolean {
        return array.reduce((a, b) => a + b) === OUR_PLAYER_WIN_SUM || array.reduce((a, b) => a + b) === OPPONENT_PLAYER_WIN_SUM;
    }

    checkIfAnyDiagonalsHaveWinner(): boolean {
        const diagonalsMap = this.formattedBoard
        const diagonals = {first: [] as number[], second: [] as number[]}; 
        for (let i = 0; i < BOARD_DIMENSION; i++) {
            diagonals.first.push(diagonalsMap[i][i]);
            diagonals.second.push(diagonalsMap[i][BOARD_DIMENSION - 1 - i]);
        }

        return this.checkIfArrayIsWinning(diagonals.first) || this.checkIfArrayIsWinning(diagonals.second);
    }

    boardHasWinner(): boolean {
        return this.checkIfAnyRowsHaveWinner() || this.checkIfAnyColumnsHaveWinner() || this.checkIfAnyDiagonalsHaveWinner();
    }

    countPlayerCurrentMoves(player: string): number {
        return this.board.split(player).length - 1;
    }

    isValidLength(): boolean {
       return this.board.length === BOARD_SIZE;
    }

    private formatBoard(): number[][] {
        const boardFormatter = new BoardFormatter(this.board);
        return boardFormatter.getFormattedBoard();
    }

}