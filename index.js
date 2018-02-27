const WIDTH = 80;
const HEIGHT = 20;

const LIFECELL = '◉';
const NOLIFECELL = '○';

function createNewBoard(){
  let arr = [];
  for (let i = 0; i < HEIGHT; i++){
    arr[i] = [];
    for (let j = 0; j < WIDTH; j++){
      arr[i][j] = 0;
    }
  }
return arr;
}

function drawBoard(board){
  console.clear();
  for (let i = 0; i < HEIGHT; i++){
    for (let j = 0; j < WIDTH; j++){
      if (board[i][j] == 1)
      {
        process.stdout.write(LIFECELL);
      }
      else {
        process.stdout.write(NOLIFECELL);
      }
    }
    console.log('');
  }
}

function randomFill(board){
  let k = 0.5;
  for (let i = 0; i < HEIGHT; i++){
    for (let j = 0; j < WIDTH; j++){
      if (Math.random() > k)
      {
        board[i][j] = 1;
      }
      else {
        board[i][j] = 0;
      }
    }
  }
  return board;
}

function getN(i, j, board)
{
  return (i >= 0) && (i < HEIGHT) && (j >= 0)
      && (j < WIDTH) && board[i][j] === 1;
}

function numberNeighborhood(i, j, board){
  return getN(i - 1, j - 1, board) + getN(i - 1, j, board) + getN(i - 1, j + 1, board)
       + getN(i, j - 1, board)                             + getN(i, j + 1, board)
       + getN(i + 1, j - 1, board) + getN(i + 1, j, board) + getN(i + 1, j + 1, board);
}

function nextGeneration(board){
  let next = createNewBoard();
  for (let i = 0; i < HEIGHT; i++){
    for (let j = 0; j < WIDTH; j++){
      let neighborhood = numberNeighborhood(i, j, board);
      if ((board[i][j] === 1) && (neighborhood > 3 || neighborhood < 2)) {
        next[i][j] = 0;
      }
      else if ((board[i][j] === 0) && (neighborhood === 3 )) {
        next[i][j] = 1;
      }
      else {
        next[i][j] = board[i][j];
      }
    }
  }
  return next;
}

let board = createNewBoard();
randomFill(board);
drawBoard(board);

setInterval(function() {
  board = nextGeneration(board);
  drawBoard(board);
}, 100);
