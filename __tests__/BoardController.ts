import { BoardController } from "../BoardController";
import { getMockReq, getMockRes } from '@jest-mock/express'
const { res } = getMockRes()

test.each([
    'xox  o  x ',
    'lsjwkwww ',
    'xoxxoxxox'])
('will respond with 400 for invalid board',
    (board) => {
    // Mock Request
    const req = getMockReq({ query: { board } })
    BoardController.getBoard(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(400)
})

test.each([
    ['xoxxoo   ', 'xoxxoo o '],
    ['xoxxxo o ', 'xoxxxooo '],
    ['o xxxo   ', 'o xxxoo  '],])
('will respond with correct string for valid board',
    (board, expectedResponse) => {
    // Mock Request
    const req = getMockReq({ query: { board } })
    BoardController.getBoard(req, res)
    expect(res.send).toHaveBeenCalledWith(expectedResponse)
    expect(res.status).toHaveBeenCalledWith(200)
})
