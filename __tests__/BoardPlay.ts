import { BoardPlay } from "../BoardPlay";

// test doPlay
test.each([
    ['xoxoxo   ', 'xoxoxoo  '],
    ['         ', '    o    ']])(
    'doPlay(%s)',
    (board, expected) => {
        const boardPlay = new BoardPlay(board);
        expect(boardPlay.doPlay()).toStrictEqual(expected);
    });


// test calculatePositionToPlay
test.each([
    ['xoxoxo   ', [2, 0] ],
    ['ooxxox   ', [2, 1] ] ])(
    'CalculatePlayPosition(%s)',
    (board, expected) => {
        const boardPlay = new BoardPlay(board);
        expect(boardPlay.calculatePositionToPlay()).toStrictEqual(expected);
    }
);