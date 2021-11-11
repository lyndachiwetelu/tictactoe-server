## How to use 
This App implements a tic tac toe server that is meant to be unbeatable.

It is [hosted here](https://server-tictactoe.lyndachiwetelu.com/) 

It expects to receive the current board as a string, passed as query parameter named `board` to the URL like this:

`https://server-tictactoe.lyndachiwetelu.com?board=+xxo++o++`

You should expect a response with the new board as a string also something like this:
`oxxo  o  `

### Invalid Boards

The board will be invalid if:
- There are no spots left to play
- There is already a winner
- There are invalid characters
- Board is wrong length
- Moves Ration is unbalanced.

If the board is invalid, the server will respond with a HTTP Status Code `400`, meaning Bad Request
Not passing a board to the server also results in a bad request status

### About the Implementation

This is an attempt to implement the Tic Tac Toe startegy outlined here.
https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy


