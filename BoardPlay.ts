import { BoardFormatter } from "./BoardFormatter";
import { BoardStrategy } from "./BoardStrategy";
import { OUR_PLAYER_MAP_VALUE } from "./constants";

export class BoardPlay {
    board: number [][];
    formatter: BoardFormatter;

    constructor(board: string) {
        const formatter = new BoardFormatter(board);
        this.formatter = formatter;
        this.board = this.formatter.getFormattedBoard();
    }

    doPlay(): string {
        const [x, y] = this.calculatePositionToPlay()
        // update board
        this.board[x][y] = OUR_PLAYER_MAP_VALUE;
        return this.formatter.convert3X3BoardArrayToString();
    }
    
    calculatePositionToPlay(): [number, number] {
        const strategy = new BoardStrategy(this.board);
        
        // is it a win
        const winPosition = strategy.getWinPosition();
        if (winPosition !== null && winPosition.length > 0) {
            return winPosition;
        }

        // is it a block
        const blockPosition = strategy.getBlockOpponentWinPosition();
        if (blockPosition !== null && blockPosition.length > 0) {
            return blockPosition;
        }

        // can i create a fork
        const _forkPosition = strategy.getForkPosition();
        if (_forkPosition !== null && _forkPosition.length > 0) {
            return _forkPosition;
        }


        // is it a single opponent fork situation
        const blockOpponentForkPosition = strategy.getBlockOpponentForkPosition();
        if (blockOpponentForkPosition !== null && blockOpponentForkPosition.length > 0) {
            return blockOpponentForkPosition;
        }

        // get two in a row position that also blocks forks 
        const blockForkPosition = strategy.getTwoInARowPositionThatAlsoBlocksForks();
        if (blockForkPosition !== null && blockForkPosition.length > 0) {
            return blockForkPosition;
        }


        // get two in a row position that does not create a fork for opponent
        const twoInARowPositionThatDoesNotCreateForkForOpponent = strategy.getTwoInARowPositionWithNoOpponentForks();
        if (twoInARowPositionThatDoesNotCreateForkForOpponent !== null && twoInARowPositionThatDoesNotCreateForkForOpponent.length > 0) {
            return twoInARowPositionThatDoesNotCreateForkForOpponent;
        }


        // get center position
        const centerPosition = strategy.getCenterPosition();
        if (centerPosition !== null && centerPosition.length > 0) {
            return centerPosition;
        }

        // get opposite corner position
        const oppositeCornerPosition = strategy.getOppositeCornerPosition();
        if (oppositeCornerPosition !== null && oppositeCornerPosition.length > 0) {
            return oppositeCornerPosition;
        }

        // get empty corner position
        const emptyCornerPosition = strategy.getFirstEmptyCornerPosition();
        if (emptyCornerPosition !== null && emptyCornerPosition.length > 0) {
            return emptyCornerPosition;
        }

        // get empty side position
        const emptySidePosition = strategy.getFirstEmptySidePosition();
        if (emptySidePosition !== null && emptySidePosition.length > 0) {
            return emptySidePosition;
        }
        
        // never reached if everything works, can be removed after extensive testing
        return [0, 0]
      
    }
}