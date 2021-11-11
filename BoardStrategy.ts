import { BOARD_DIMENSION, EMPTY_CELL_MAP_VALUE, OPPONENT_PLAYER_MAP_VALUE, OPPONENT_PLAYER_TWO_IN_A_ROW, OUR_PLAYER_MAP_VALUE, OUR_PLAYER_TWO_IN_A_ROW } from "./constants";
import { BoardValueType, TwoInARowEmptyCellType } from "./HelperTypes";

export class BoardStrategy {
    board: number[][];

    constructor(board: number[][]) {
        this.board = board
    }

    getWinPosition(): [number, number] | null {
        const rowInfo = this.getPositionForRowOrColumnOrDiagonalWithTwoInARowSum(this.board, OUR_PLAYER_TWO_IN_A_ROW);
        if ( rowInfo !== null ) {
            return [rowInfo.row, rowInfo.column];
        } else {
           return null;
        }
    }

    getBlockOpponentWinPosition(): [number, number] | null {
        const rowInfo = this.getPositionForRowOrColumnOrDiagonalWithTwoInARowSum(this.board, OPPONENT_PLAYER_TWO_IN_A_ROW);
        if ( rowInfo !== null ) {
            return [rowInfo.row, rowInfo.column];
        } else {
           return null;
        }
    }

    // Try to create a Fork
    getForkPosition(): [number, number] | null {
        // for each position check if a fork can be created for our player 
        const emptyCellIndexes = this.getAllEmptyCellIndexes(this.board);
        let maxTwoInARowCount = 0;
        let maxTwoInARowPosition: [number, number] | null = null;

        emptyCellIndexes.forEach(position => {
            const boardCopy = this.board.map(row => row.slice());
            const boardWithPlayedPosition = this.playPosition(boardCopy, position, OUR_PLAYER_MAP_VALUE);
            const twoInARowCount = this.getAllTwoInARow(boardWithPlayedPosition, OUR_PLAYER_TWO_IN_A_ROW);
            if (twoInARowCount.length >= 2 && twoInARowCount.length > maxTwoInARowCount) {
                maxTwoInARowCount = twoInARowCount.length;
                maxTwoInARowPosition = position;
            }
        });

        if ( maxTwoInARowCount > 0 ) {
            return maxTwoInARowPosition;
        }

        return null;
    }

    getBlockOpponentForkPosition(): [number, number] | null {
        // for each empty position, check if exactly one opponent fork can be created
        const emptyCellIndexes = this.getAllEmptyCellIndexes(this.board);
        let opponentForkCount = 0;
        let bestPositionForOpponentFork: [number, number] | null = null;
        const positionsWhichGiveOpponentForks: [number, number][] = [];

        emptyCellIndexes.forEach(position => {
            const boardCopy = this.board.map(row => row.slice());
            const boardWithPlayedPosition = this.playPosition(boardCopy, position, OPPONENT_PLAYER_MAP_VALUE);

            const twoInARows = this.getAllTwoInARow(boardWithPlayedPosition, OPPONENT_PLAYER_TWO_IN_A_ROW);

            if (twoInARows.length === 2) {
                opponentForkCount++;
                positionsWhichGiveOpponentForks.push(position);
                
            } 
        }
        );

        if ( opponentForkCount === 1 ) {
            return positionsWhichGiveOpponentForks[0];
        }

        return null;
    }

     // block all forks in a way that allows you to create a two in a row
    getTwoInARowPositionThatAlsoBlocksForks(board: number[][] = this.board): [number, number] | null {
        // check if opponent has forks 
        const potentialOpponentForks = this.countOpponentPotentialForksForBoard(board);
        let minOpponentForks = potentialOpponentForks

        if ( potentialOpponentForks > 0 ) {
            // try all spots to see the one that blocks opponent fork
            const emptyCellIndexes = this.getAllEmptyCellIndexes(board);
            let maxTwoInARowCount = 0;
            let maxTwoInARowPosition: [number, number] | null = null;

            emptyCellIndexes.forEach(position => {
                const boardCopy = board.map(row => row.slice());
                const boardWithPlayedPosition = this.playPosition(boardCopy, position, OUR_PLAYER_MAP_VALUE);
                const twoInARows = this.getAllTwoInARow(boardWithPlayedPosition, OUR_PLAYER_TWO_IN_A_ROW);
                const newOpponentForks = this.countOpponentPotentialForksForBoard(boardWithPlayedPosition);
               
                if (twoInARows.length > 0) {
                    if (newOpponentForks < minOpponentForks) {
                        minOpponentForks = newOpponentForks;
                        maxTwoInARowPosition = position;
                        maxTwoInARowCount = twoInARows.length;
                    }
                    
                }
            }

            );

            if ( maxTwoInARowCount > 0 ) {
                return maxTwoInARowPosition;
            }

        }

        return null;
    }

    playPosition(board: number[][], position: [number, number], player: number) : number[][] {
        const row = position[0];
        const column = position[1];
        const newBoard = [...board];
        newBoard[row][column] = player;
        return newBoard;
    }
       
    getTwoInARowPositionWithNoOpponentForks(): [number, number] | null {
        const emptyCellIndexes = this.getAllEmptyCellIndexes(this.board);
        let maxTwoInARowCount = 0;
        let maxTwoInARowPosition: [number, number] | null = null;

        emptyCellIndexes.forEach(position => {
            const boardCopy = this.board.map(row => row.slice());
            const boardWithPlayedPosition = this.playPosition(boardCopy, position, OUR_PLAYER_MAP_VALUE);
            const twoInARows = this.getAllTwoInARow(boardWithPlayedPosition, OUR_PLAYER_TWO_IN_A_ROW);
            // if position result in a two in a row check that there are no opponent forks
            if ( twoInARows.length > 0 ) {
                const opponentForkCount = this.countOpponentPotentialForksForBoard(boardWithPlayedPosition);
                if ( opponentForkCount === 0 ) {
                    if ( twoInARows.length > maxTwoInARowCount ) {
                        maxTwoInARowCount = twoInARows.length;
                        maxTwoInARowPosition = position;
                    }
                }
            }
        });

        return maxTwoInARowPosition;  
    }

    getCenterPosition(): [number, number] | null {
       // get center position if not occupied
         const centerPosition = [Math.floor(BOARD_DIMENSION / 2), Math.floor(BOARD_DIMENSION / 2)];
            if ( this.board[centerPosition[0]][centerPosition[1]] === EMPTY_CELL_MAP_VALUE) {
                return [centerPosition[0], centerPosition[1]];
            }

        return null;
    }

    getOppositeCornerPosition(): [number, number] | null {
        // get all corner positions with opponent 
        const cornerPositions = this.getAllCornerPositions();
        const opponentCornerPositions = cornerPositions.filter(cornerPosition => this.board[cornerPosition[0]][cornerPosition[1]] === OPPONENT_PLAYER_MAP_VALUE);

        // find the opposite corner positions for opponentCornerPositions 
        const oppositeCornerPositions : any = opponentCornerPositions.map(cornerPosition => {
            if ( cornerPosition[0] === 0 ) {
                return [BOARD_DIMENSION - 1, cornerPosition[1]];
            } else if ( cornerPosition[1] === 0 ) {
                return [cornerPosition[0], BOARD_DIMENSION - 1];
            } else if ( cornerPosition[0] === BOARD_DIMENSION - 1 ) {
                return [0, cornerPosition[1]];
            } else if ( cornerPosition[1] === BOARD_DIMENSION - 1 ) {
                return [cornerPosition[0], 0];
            } else {
                return null;
            }

        });

        // return empty opposite corner position or null
        const emptyOppositeCornerPositions = oppositeCornerPositions.filter((oppositeCornerPosition: any) => this.board[oppositeCornerPosition[0]][oppositeCornerPosition[1]] === EMPTY_CELL_MAP_VALUE);
        if ( emptyOppositeCornerPositions.length > 0 ) {
            return [emptyOppositeCornerPositions[0][0], emptyOppositeCornerPositions[0][1]];
        }

        return null;
    }

    getAllCornerPositions() {
        return [[0, 0], [0, 2], [2, 0], [2, 2]];
    }

    getFirstEmptyCornerPosition(): [number, number] | null {
        // get all corners and return the first empty one
        const cornerPositions = this.getAllCornerPositions();
        const emptyCornerPositions = cornerPositions.filter(cornerPosition => this.board[cornerPosition[0]][cornerPosition[1]] === EMPTY_CELL_MAP_VALUE);
        if ( emptyCornerPositions.length > 0 ) {
            return [emptyCornerPositions[0][0], emptyCornerPositions[0][1]];
        }

        return null;
    }

    getFirstEmptySidePosition() : [number, number] | null {
        // get the middle of all side positions and return an empty one 
        const sidePositions = this.getMiddlePositionOfAllSides();
        const emptySidePositions = sidePositions.filter(sidePosition => this.board[sidePosition[0]][sidePosition[1]] === EMPTY_CELL_MAP_VALUE);
        if ( emptySidePositions.length > 0 ) {
            return [emptySidePositions[0][0], emptySidePositions[0][1]];
        }

        return null;
    }

    getMiddlePositionOfAllSides() {
        return [[0, 1], [1, 0], [1, 2], [2, 1]];
    }

    getAllEmptyCellIndexes(board: number[][]): [number, number][] {
        const emptyCellIndexes: [number, number][] = [];
        for (let i = 0; i < BOARD_DIMENSION; i++) {
            for (let j = 0; j < BOARD_DIMENSION; j++) {
                if (board[i][j] === EMPTY_CELL_MAP_VALUE) {
                    // push tuple of position to emptyCellIndexes
                    emptyCellIndexes.push([i, j]);
                }
            }
        }
        return emptyCellIndexes;
    }

    countOpponentPotentialForksForBoard(board: number[][]): number {
       // for every empty cell, check if opponent can fork and count it
         let countForks = 0;
         let maxOpponentTwoInARow = 0;

         const emptyCellIndexes = this.getAllEmptyCellIndexes(board);
            emptyCellIndexes.forEach(emptyCellIndex => {
                
                // update board with opponent move then count two in a rows, then select max
                const boardCopy = board.map(row => row.slice());
                const boardWithPlayedPosition = this.playPosition(boardCopy, emptyCellIndex, OPPONENT_PLAYER_MAP_VALUE);
                const opponentForkCount = this.getAllTwoInARow(boardWithPlayedPosition, OPPONENT_PLAYER_TWO_IN_A_ROW);
                
                if (opponentForkCount.length >= 2) { 
                    countForks++;              
                    maxOpponentTwoInARow = opponentForkCount.length;
                }
            });  
            
        return countForks
    }

    getAntiDiagonal(board: number[][] = this.board): number[] {
        const antiDiagonal = [];
        for (let i = 0; i < BOARD_DIMENSION; i++) {
            antiDiagonal.push(board[i][BOARD_DIMENSION - i - 1]);
        }
        return antiDiagonal;
    }

    getDiagonal(board: number[][] = this.board) {
        const diagonal = [];
        for (let i = 0; i < BOARD_DIMENSION; i++) {
            diagonal.push(board[i][i]);
        }
        return diagonal;
    }

    getEmptyCellIndexFromTwoInARow(arrayOfValues: number[]): number {
        return arrayOfValues.indexOf(EMPTY_CELL_MAP_VALUE);
    }

    getAllTwoInARow(board: number[][], playerSum: number): BoardValueType[] {
        const allPossibleTwoInARows: BoardValueType[] = new Array<BoardValueType>();

        for (let i = 0; i < BOARD_DIMENSION; i++) {
            const row = board[i];
            const rowSum = row.reduce((a, b) => a + b, 0);
            if (rowSum === playerSum) {
                const emptyCellIndex = this.getEmptyCellIndexFromTwoInARow(row);
                if (emptyCellIndex !== -1) {
                    allPossibleTwoInARows.push({value: row, row: i, column: emptyCellIndex});
                }
            }
        }

        for (let i = 0; i < BOARD_DIMENSION; i++) {
            const column = board.map(row => row[i]);
            const columnSum = column.reduce((a, b) => a + b, 0);
            if (columnSum === playerSum) {
                const emptyCellIndex = this.getEmptyCellIndexFromTwoInARow(column);
                if (emptyCellIndex !== -1) {
                    allPossibleTwoInARows.push({value: column, row: emptyCellIndex, column: i});
                }
            }
        }

        const diagonal = this.getDiagonal(board);
        const diagonalSum = diagonal.reduce((a, b) => a + b, 0);
       
        if (diagonalSum === playerSum) {
            
            const emptyCellIndex = this.getEmptyCellIndexFromTwoInARow(diagonal);
            allPossibleTwoInARows.push({value: diagonal, row: emptyCellIndex, column: emptyCellIndex});
        }

        const antiDiagonal = this.getAntiDiagonal(board);
        const antiDiagonalSum = antiDiagonal.reduce((a, b) => a + b, 0);
       

        if (antiDiagonalSum === playerSum) {
            
            const emptyCellIndex = this.getEmptyCellIndexFromTwoInARow(antiDiagonal);
            allPossibleTwoInARows.push({value: antiDiagonal, row: BOARD_DIMENSION - emptyCellIndex - 1, column: emptyCellIndex});
        }

        return allPossibleTwoInARows;

    }
     
    
    getRowWithTwoInARowSum(board: number[][], sum: number): BoardValueType | null {
        for (let i = 0; i < BOARD_DIMENSION; i++) {
            const row = board[i];
            const rowSum = row.reduce((a, b) => a + b, 0);
           
            if (rowSum === sum) {
                const emptyCellIndex = this.getEmptyCellIndexFromTwoInARow(row);
                if (emptyCellIndex !== -1) {
                    return {value: row, row: i, column: emptyCellIndex};
                }
            }
        }

        return null;
    }

    getColumnWithTwoInARowSum(board: number[][], sum: number): BoardValueType | null {
        for (let i = 0; i < BOARD_DIMENSION; i++) {
            const column = board.map(row => row[i]);
            const columnSum = column.reduce((a, b) => a + b, 0);

            if (columnSum === sum) {
                const emptyCellIndex = this.getEmptyCellIndexFromTwoInARow(column);
                if (emptyCellIndex !== -1) {
                    return {value: column, row: emptyCellIndex, column: i};
                }
            }
        }
        return null;
    }

    getPositionForRowOrColumnOrDiagonalWithTwoInARowSum(board: number[][], playerSum: number): TwoInARowEmptyCellType | null {
        // get a row or a column or a dialog with two in a row sum
        const rowWithTwoInARowSum = this.getRowWithTwoInARowSum(board, playerSum);
        if (rowWithTwoInARowSum) {
            return {row: rowWithTwoInARowSum.row, column: rowWithTwoInARowSum.value.indexOf(EMPTY_CELL_MAP_VALUE)};
        }

        const columnWithTwoInARowSum = this.getColumnWithTwoInARowSum(board, playerSum);
        if (columnWithTwoInARowSum) {
            return {row: columnWithTwoInARowSum.value.indexOf(EMPTY_CELL_MAP_VALUE), column: columnWithTwoInARowSum.column!};
        }

        // check if antidiagonal has two in a row sum 
        const antidiagonal = this.getAntiDiagonal(board);
        const antidiagonalSum = antidiagonal.reduce((a, b) => a + b, 0);
        if (antidiagonalSum === playerSum) {
            const emptyCellIndex = this.getEmptyCellIndexFromTwoInARow(antidiagonal);
            return {row: emptyCellIndex, column: emptyCellIndex};
        }

        // check if diagonal has two in a row sum
        const diagonal = this.getDiagonal(board);
        const diagonalSum = diagonal.reduce((a, b) => a + b, 0);
        if (diagonalSum === playerSum) {
            const emptyCellIndex = this.getEmptyCellIndexFromTwoInARow(diagonal);
            return {row: emptyCellIndex, column: emptyCellIndex};
        }

        return null;
        
    }

}


