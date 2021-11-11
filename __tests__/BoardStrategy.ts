import { BoardStrategy } from "../BoardStrategy";
import { BoardValueType } from "../HelperTypes";

// test getWinPosition
test.each([
    [
        [
            [0, -1, -1], [1, 0, 0], [0, 0, 0]
        ], null
    ],
    [
        [
            [0, -1, -1], [1, 1, 0], [0, 0, 0]
        ], [1, 2]
    ],])(
    'getWinPosition(%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getWinPosition()).toStrictEqual(expected);
    }
);

// test getBlockOpponentWinPosition
test.each([
    [
        [
            [0, -1, -1], [1, 0, 0], [0, 0, 0]
        ], [0, 0]
    ],
    [
        [
            [0, 0, -1], [1, 1, 0], [0, 0, -1]
        ], [1, 2]
    ],])(
    'getBlockOpponentWinPosition(%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getBlockOpponentWinPosition()).toStrictEqual(expected);
    }
);


// test getForkPosition
test.each([
    [
        [
            [0, 0, -1], [1, 0, -1], [0, 0, 1]
        ], [0, 0]
    ],
    [
        [
            [0, 0, -1], [1, 1, 0], [0, 0, -1]
        ], [0, 0]
    ],
    [
        [
            [0, -1, -1], [1, -1, 1], [0, 0, 0]
        ], null
    ]
    ,])(
    'getForkPosition(%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getForkPosition()).toStrictEqual(expected);
    }
);


// test getBlockOpponentForkPosition
test.each([
    [
        [
            [1, 0, 0], [-1, 0, 0], [1, 0, -1]
        ], [1, 2]
    ]
    ,])(
    'getBlockOpponentForkPosition(%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getBlockOpponentForkPosition()).toStrictEqual(expected);
    }
);


// getTwoInARowPositionThatAlsoBlocksForks
test.each([
    [
        [
            [1, 0, 0], [0, -1, 0], [0, 0, -1]
        ], [0, 2]
    ]
    ,])(
    'getTwoInARowPositionThatAlsoBlocksForks (%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getTwoInARowPositionThatAlsoBlocksForks()).toStrictEqual(expected);
    }
);

// test playPosition
test.each([
    [
        [
            [0, 0, 0], [0, 0, 0], [0, 0, 0]
        ], [0, 0], 1, [
            [1, 0, 0], [0, 0, 0], [0, 0, 0]
        ]
    ],
    [
        [
            [0, 0, 0], [0, 0, 0], [0, 0, 0]
        ], [0, 0], -1, [
            [-1, 0, 0], [0, 0, 0], [0, 0, 0]
        ]
    ],])(
    'playPosition(%p, %p, %p) should return %p',(board, position, player, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.playPosition(board, position as [number, number], player)).toStrictEqual(expected);
    });

// test getTwoInARowPositionWithNoOpponentForks
test.each([
    [
        [
            [-1, 0, 0], [1, 0, 0], [-1, 0, 0]
        ], [1, 1]
    ]
    ,])(
    'getTwoInARowPositionWithNoOpponentForks (%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getTwoInARowPositionWithNoOpponentForks()).toStrictEqual(expected);
    }
);

// test getCenterPosition
test.each([
    [
        [
            [-1, 0, 0], [1, 0, 0], [-1, 0, 0]
        ], [1, 1]
    ],
    [
        [
            [-1, 0, 0], [1, 1, 0], [-1, 0, 0]
        ], null
    ],
    [
        [
            [-1, 0, 0], [1, -1, 0], [-1, 0, 0]
        ], null
    ]
    ,])(
    'getCenterPosition (%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getCenterPosition()).toStrictEqual(expected);
    }
);

// test getOppositeCornerPosition
test.each([
    [
        [
            [-1, 0, 0], [1, 0, 0], [-1, 0, 0]
        ], [2,2]
    ],
    [
        [
            [1, 0, 0], [0, 1, 0], [-1, 0, 0]
        ], [2, 2]
    ]
    ,])(
    'getOppositeCornerPosition (%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getOppositeCornerPosition()).toStrictEqual(expected);
    }
);

// test getAllCornerPositions
test('getAllCornerPositions should return [[0, 0], [0, 2], [2, 0], [2, 2]]', () => {
    const strategy = new BoardStrategy([]);
    expect(strategy.getAllCornerPositions()).toStrictEqual([[0, 0], [0, 2], [2, 0], [2, 2]]);
});

// test getFirstEmptyCornerPosition
test.each([
    [
        [
            [-1, 0, 0], [1, 0, 0], [-1, 0, 0]
        ], [0,2]
    ],
    [
        [
            [0, 0, 0], [0, 1, 0], [-1, 0, 0]
        ], [0,0]
    ]
    ,])(
    'getFirstEmptyCornerPosition (%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getFirstEmptyCornerPosition()).toStrictEqual(expected);
    }
);

// // test getFirstEmptySidePosition
test.each([
    [
        [
            [-1, 0, 0], [1, 0, 0], [-1, 0, 0]
        ], [0,1]
    ],
    [
        [
            [0, 1, 0], [0, 1, 0], [-1, 0, 0]
        ], [1, 0]
    ]
    ,])(
    'getFirstEmptySidePosition (%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getFirstEmptySidePosition()).toStrictEqual(expected);
    }
);

// test getMiddlePositionOfAllSides
test.each([
    [
        [
            [-1, 0, 0], [1, 0, 0], [-1, 0, 0]
        ],
        [
            [-1, 1, 0], [1, 0, 0], [-1, 0, 0]
        ]
    ]
    ,])(
    'getMiddlePositionOfAllSides (%p) should return %p',(board) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getMiddlePositionOfAllSides()).toStrictEqual([[0, 1], [1, 0], [1, 2], [2, 1]]);
    }
);

// test getAllEmptyCellIndexes
test.each([
    [
        [
            [-1, -1, 0], [1, 0, 0], [-1, 0, 0]
        ],
        [[0, 2], [1, 1], [1, 2], [2, 1], [2, 2]]
    ]
    ,])(
    'getAllEmptyCellIndexes (%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getAllEmptyCellIndexes(board)).toStrictEqual(expected);
    }
);

//test countOpponentPotentialForksForBoard
test.each([
    [
        [
            [1, 0, 0], [0, -1, 0], [0, 0, -1]
        ],
        4
    ]
    ,])(
    'countOpponentPotentialForksForBoard',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.countOpponentPotentialForksForBoard(board)).toEqual(expected);
    }
);

// test getAntiDiagonal
test.each([
    [
        [
            [1, 0, 0], [0, -1, 0], [0, 0, -1]
        ],
        [0, -1, 0]
    ]
    ,])(
    'getAntiDiagonal (%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getAntiDiagonal(board)).toEqual(expected);
    }
);

// test getDiagonal
test.each([
    [
        [
            [1, 0, 0], [0, -1, 0], [0, 0, -1]
        ],
        [1, -1, -1]
    ]
    ,])(
    'getDiagonal (%p) should return %p',(board, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getDiagonal(board)).toEqual(expected);
    }
);


// test getEmptyCellIndexFromTwoInARow
test.each([
    [
        [-1, 0, 1],
        1
    ],
    [
        [0, 1, 1],
        0
    ]
    ,])(
    'getEmptyCellIndexFromTwoInARow (%p) should return %p',(array, expected) => {
        const strategy = new BoardStrategy([[]]);
        expect(strategy.getEmptyCellIndexFromTwoInARow(array)).toEqual(expected);
    }
);

// test getAllTwoInARow
test.each([
    [
        [
            [1, 0, 0], [0, -1, 0], [0, -1, -1]
        ],
        -2,
        [[0, -1, -1], [0, -1, -1]]
    ]
    ,])(
    'getAllTwoInARow (%p) should return %p',(board, playerSum, expected) => {
        const strategy = new BoardStrategy(board);
        const values : BoardValueType[] = strategy.getAllTwoInARow(board, playerSum)
        expect(values.map(value => value.value)).toEqual(expected);
    }
);

// test getRowWithTwoInARowSum
test.each([
    [
        [
            [1, 0, 0], [0, -1, 0], [0, -1, -1]
        ],
        -2,
        [0, -1, -1]
    ]
    ,])(
    'getRowWithTwoInARowSum (%p) should return %p',(board, playerSum, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getRowWithTwoInARowSum(board, playerSum)?.value).toEqual(expected);
    }
);
 
// test getColumnWithTwoInARowSum
test.each([
    [
        [
            [1, 0, 0], [0, -1, 0], [0, -1, -1]
        ],
        -2,
        [0, -1, -1]
    ]
    ,])(
    'getColumnWithTwoInARowSum (%p) should return %p',(board, playerSum, expected) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getColumnWithTwoInARowSum(board, playerSum)?.value).toEqual(expected);
    }
);

// test getPositionForRowOrColumnOrDiagonalWithTwoInARowSum
test.each([
    [
        [
            [1, 0, 0], [0, -1, 0], [0, -1, -1]
        ],
        -2,
        2,
        0  
    ],
    [
        [
            [-1, 0, 0], [0, -1, 0], [0, 1, 0]
        ],
        -2,
        2,
        2  
    ]
    ,])(
    'getPositionForRowOrColumnOrDiagonalWithTwoInARowSum (%p) should return %p',(board, playerSum, expectedRow, expectedColumn) => {
        const strategy = new BoardStrategy(board);
        expect(strategy.getPositionForRowOrColumnOrDiagonalWithTwoInARowSum(board, playerSum)?.row).toEqual(expectedRow);
        expect(strategy.getPositionForRowOrColumnOrDiagonalWithTwoInARowSum(board, playerSum)?.column).toEqual(expectedColumn);
    }
);

