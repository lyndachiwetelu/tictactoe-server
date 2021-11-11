import { BoardFormatter } from "../BoardFormatter";

// test getFormattedBoard / mapBoardToNumbers
test.each([
    [ 'xox xx oo', [ [-1, 1, -1], [0, -1, -1], [0, 1, 1] ] ],
    [ 'oxo xx oo', [ [1, -1, 1], [0, -1, -1], [0, 1, 1] ]],]
)('getFormattedBoard(%s) should return %s', (board, expected) => {
    const boardFormatter = new BoardFormatter(board);
    expect(boardFormatter.getFormattedBoard()).toEqual(expected);
    expect(boardFormatter.mapBoardToNumbers(board)).toEqual(expected);
});

// test convertBoardTo3X3Array
test.each([
    [ '-1,1,-1,0,-1,-1,0,1,1', [ [-1, 1, -1], [0, -1, -1], [0, 1, 1] ] ],
    [ '1,-1,1,0,-1,-1,0,1,1', [ [1, -1, 1], [0, -1, -1], [0, 1, 1] ]],]
)('convertBoardTo3X3Array(%s) should return %s', (board, expected) => {
    const boardFormatter = new BoardFormatter(board);
    expect(boardFormatter.convertBoardTo3X3Array(board)).toEqual(expected);
});

// test convert3X3BoardArrayToString
test.each([
    'xox oo xx',
    'oxo oo xx',]
)('convert3X3BoardArrayToString(%s) should return %s', (board) => {
    const boardFormatter = new BoardFormatter(board);
    expect(boardFormatter.convert3X3BoardArrayToString()).toEqual(board);
});

// test getOriginalBoardString
test.each([
    [ -1, 'x' ],
    [ 1, 'o' ],
    [ 0, ' ' ],])
('getOriginalBoardString(%s) should return %s', (number, expected) => {
    const boardFormatter = new BoardFormatter('');
    expect(boardFormatter.getOriginalBoardString(number)).toEqual(expected);
});
