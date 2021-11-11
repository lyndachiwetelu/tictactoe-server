## How to use 
This App implements a tic tac toe server that is meant to be unbeatable.

It is a stateless API that answers the question, “What move will result in the best outcome for o on this tic-tac-toe board?” 

It is [hosted here](https://server-tictactoe.lyndachiwetelu.com/) 

It expects to receive the current board as a string, passed as query parameter named `board` to the URL like this:

[`https://server-tictactoe.lyndachiwetelu.com?board=+xxo++o++`](https://server-tictactoe.lyndachiwetelu.com?board=+xxo++o++)

where 'x' is your player and 'o' is always the server's player. Blank spaces should be passed as empty cells.

:warning: Please only send lower cased characters to this server

You should expect a response with the new board as a string also something like this:
"oxxo&nbsp;&nbsp;o&nbsp;&nbsp;"

### Invalid Boards

The board will be invalid if:
- There are no spots left to play
- There is already a winner
- There are invalid characters
- Board is wrong length
- Moves Ration is unbalanced.

If the board is invalid, the server will respond with a HTTP Status Code `400`, meaning a 'Bad Request'

Not passing a board to the server also results in a bad request status

### About the Implementation

This is an attempt to implement the Tic Tac Toe startegy outlined here.
https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy


