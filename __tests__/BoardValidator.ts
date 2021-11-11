import { BoardValidator } from '../BoardValidator';

// test board validity
test.each([
    [' xxo  o  ', true],
    [' xooxooxo', false],
    [' x  xxxxo', false],
    ['xx  ooooo', false],
    ['xo   ooxx', true],
    ['xoxoxoxo', false],
    ['x  x  xoo', false],
    ['o  o  oxx', false],
    ['xo ox oxx', false],])
    ('validate board "%s" has isValid = %s', (board, expected) => {
        const boardValidator = new BoardValidator(board);
        expect(boardValidator.isValid()).toBe(expected);
    });

// test board has only valid characters
test.each([
    ['-xo.3errr', false],
    [' yooxooxo', false],
    [' x  xxxxo', true],
    ['xx  ooooo', true],])
    ('validate board "%s" has only valid acharacters (x,o or space) = %s', (board, expected) => {
        const boardValidator = new BoardValidator(board);
        expect(boardValidator.boardHasOnlyValidCharacters()).toBe(expected);
});

// validate count player moves 
test.each([
    ['xxo  o  ', 'o', 2],
    [' xooxooxo', 'o', 5],
    ['xx  ooooo', 'x', 2],])
    ('validate board "%s" has countPlayerMoves = %s', (board, player, expected) => {
        const boardValidator = new BoardValidator(board);
        expect(boardValidator.countPlayerCurrentMoves(player)).toBe(expected);
    });

// validate length of board
test.each([
    ' xxo  o  ', 
    '         ', 
    ' xooxooxo', 
    ' xooxooxo'
])('board is valid length', (board) => {
    const boardValidator = new BoardValidator(board);
    expect(boardValidator.isValidLength()).toBe(true);
});

// validate board has empty cells 
test.each([ 
    ['xxo  o  ', true],
    [' xooxooxo', true],
    ['xx  ooooo', true],
    ['xo   ooxx', true],
    ['xoxoooxxo', false]])
    ('validate board "%s" has empty cells = %s', (board, expected) => {
        const boardValidator = new BoardValidator(board);
        expect(boardValidator.boardHasEmptyCells()).toBe(expected);
    }
);

// validate board rows already have a winner
test.each([
    ['xxo  o  ', false],
    [' xooxooxo', false],
    ['xx  ooooo', true],
    ['xo   ooxx', false],
    ['xoxoooxxx', true]])
    ('validate board "%s" rows has winner = %s', (board, expected) => {
        const boardValidator = new BoardValidator(board);
        expect(boardValidator.checkIfAnyRowsHaveWinner()).toBe(expected);
    }
);

// validate board columns already have a winner
test.each([
    ['xxo  o  ', false],
    [' xooxooxo', true],
    ['xxo  oxoo', true],
    ['xo   ooxx', false],
    ['xoxoooxox', true]])
    ('validate board "%s" columns has winner = %s', (board, expected) => {
        const boardValidator = new BoardValidator(board);
        expect(boardValidator.checkIfAnyColumnsHaveWinner()).toBe(expected);
    }
);

// validate board diagonals already have a winner
test.each([
    ['xxo  o  ', false],
    [' xooxooxo', false],
    ['xxo  oxoo', false],
    ['xo   ooxx', false],
    ['xoxoxoxox', true],
    ['oxo o xxo', true]])
    ('validate board "%s" diagonal has winner = %s', (board, expected) => {
        const boardValidator = new BoardValidator(board);
        expect(boardValidator.checkIfAnyDiagonalsHaveWinner()).toBe(expected);
    }
);

// validate array is winning combination
test.each([
    [[-1,-1,-1 ], true],
    [[1, 1, 1 ], true],
    [[-1, 1,-1 ], false],
    [[1, -1, 1 ], false],
    [[0, -1, 0 ], false],
    [[0, 0, 0 ], false],])
    ('validate array "%s" is winning combination = %s', (array, expected) => {
        const boardValidator = new BoardValidator('');
        expect(boardValidator.checkIfArrayIsWinning(array)).toBe(expected);
    
    }
);


