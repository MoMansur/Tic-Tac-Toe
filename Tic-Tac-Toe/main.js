const DOMgrid = document.querySelectorAll('.cell')

const gameBoxDom = document.querySelector('.gameBox')





function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.winner = function() {
    console.log(`${this.name} is the winner`)
  };
}

const player1 = new Player('Musa', 'X');
const player2 = new Player('steve', 'O');
player1.winner(); 
player2.winner(); 



function gameBoard(){
let   board = ['','','',  '','','', '','','']; 

function gameDisplay(board){

  DOMgrid.forEach(cell => {
    const index = parseInt(cell.getAttribute('data-index'));
    cell.innerHTML = board[index]
  });
}


function resetBoard(){
  board = ['','','',  '','','', '','','']; 
  return gameDisplay(board)
}



function checkForWins(board){
  const winningCombos = [[0,1,2],[3,4,5],[6,7,8], [0,3,6],[1,4,7],[2,5,8], [0,4,8],[2,4,6]]


  for(const positions of winningCombos){
      const [a,b,c] = positions;

      if (board[a] && board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
         console.log(board[a]);
      }else{
        return 'Tie'
      }

    }
}




const activePlayer = () => player1

return {board, resetBoard, checkForWins, gameDisplay}
}



const getBoard = () => gameBoard().board
const getReset = ()=> gameBoard().resetBoard(getBoard)

console.log(getBoard())


// gameDisplay(getBoard)



function gamePlay(){

  function playerInsertMarker(board, playerMarker){
    gameBoxDom.addEventListener('click', (e)=>{
      const clickedGrid = e.target
      const index = parseInt(clickedGrid.getAttribute('data-index'));
  
      board[index] =playerMarker
      console.log(board)

      const gameDisplay = () => gameBoard().gameDisplay(board)
      gameDisplay(getBoard())
    })
  }
  
 

  const activePlayer = () => player1
  

  function switchTurns(){
    let playerOneActive = playerInsertMarker(board, player2.marker)
    let playerTwoActive = playerInsertMarker(board, player1.marker)
    
  }
  

  function printNewRound(){}

  function playRound(){}



  return{playRound, playerInsertMarker }
}
gamePlay().playerInsertMarker(getBoard(), player2.marker)




function gameFunctions(board){

const checkForWins = ()=>{
  const winningCombos = [[0,1,2],[3,4,5],[6,7,8], [0,3,6],[1,4,7],[2,5,8], [0,4,8],[2,4,6]]

  let finalStatus = '';

  for(const positions of winningCombos){
      const [a,b,c] = positions;

      if (board[a] && board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
        return finalStatus = board[a];
      }else{
        return finalStatus = 'Tie'
      }

    }
}


return{checkForWins}


}

gameFunctions(getBoard()).checkForWins()

