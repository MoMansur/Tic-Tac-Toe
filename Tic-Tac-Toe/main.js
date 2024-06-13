const DOMgrid = document.querySelectorAll('.cell')
const gameBoxDom = document.querySelector('.gameBox')
const statusMessage = document.getElementById('statusMessage')


function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.winner = function() {
    console.log(`${this.name} is the winner`)
  };
}

const player1 = new Player('Musa', 'X');
const player2 = new Player('steve', 'O');



function gameBoard(){
let board = ['','','',  '','','', '','','']; 

function gameDisplay(board){
  DOMgrid.forEach(cell => {
    const index = parseInt(cell.getAttribute('data-index'));
    cell.innerHTML = board[index]
  });
}

function resetBoard(board){
  board = ['','','',  '','','', '','','']; 
  return gameDisplay(board)
}

return {board, resetBoard, gameDisplay}
}

const getBoard = () => gameBoard().board
const getReset = ()=> gameBoard().resetBoard(getBoard())

//GAME FUNCTION FUNCION
function gameFunctions(board){

  function refresher(){
    const timer = setInterval( getReset(), 3000)
  }

  const checkForWins = (winnerName) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
  
    for (const positions of winningCombos) {
      const [a, b, c] = positions;
  
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        statusMessage.innerText = board[a] +' is the winner';

         return board[a]

      }
    }
      if (board.every(cell => cell !== "")) {
      console.log('tIe') 
      statusMessage.innerText = 'A TIE';

      return 'Tie'
    }
      return null; 
  };

return {checkForWins,}

}


//GAME PLAY FUNCTION
function gamePlay(){

  let activePlayer = player1;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  }

  const getActivePlayer = () => activePlayer;
  

  function playerInsertMarker(board){
    gameBoxDom.addEventListener('click', (e)=>{
      const clickedGrid = e.target
      const index = parseInt(clickedGrid.getAttribute('data-index'));

      if(board[index] !== ""){
        board[index]= board[index]
      }else{
        board[index] = activePlayer.marker
        switchPlayerTurn()
      }
      console.log(board)

      const gameDisplay = () => gameBoard().gameDisplay(board)
      gameDisplay(board)
      let gameOver = gameFunctions(board).checkForWins()

     console.log(gameOver)
     if(gameOver === 'X'){
      printNewRound(board)
     }

    })


  }

  function playRound(board){
   
  getReset()
    playerInsertMarker(board, getActivePlayer().marker)
    

  }

  function printNewRound(board){
    // getReset()
    playerInsertMarker(board, getActivePlayer().marker)
  
  }

 

  return{playRound, printNewRound, getActivePlayer, switchPlayerTurn}
}



const game = gamePlay()
game.playRound(getBoard())
// game.printNewRound()




