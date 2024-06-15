// DOM elements
const DOMgrid = document.querySelectorAll('.cell');
const gameBoxDom = document.querySelector('.gameBox');
const statusMessage = document.getElementById('statusMessage');

// Score elements
const playerOneNameDom = document.querySelector('.name1');
const playerOneScoreDom = document.querySelector('.score1');
const playerTwoNameDom = document.querySelector('.name2');
const playerTwoScoreDom = document.querySelector('.score2');

// Reset button
const resetScores = document.getElementById('resetScores');

// Player constructor
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.score = 0;
  this.winner = function() {
    let theScore = this.score++;
    return theScore;
  };
}

// Create players
const player1 = new Player('Player One', 'X');
const player2 = new Player('Player Two', 'O');

// Game board module
function gameBoard() {
  let board = ['','','',  '','','', '','',''];

  // Reset the board
  function resetBoard(board) {
    board = ['','','',  '','','', '','',''];
    gameDisplay(board);
    return board;
  }

  // Display the board
  function gameDisplay(board) {
    DOMgrid.forEach(cell => {
      const index = parseInt(cell.getAttribute('data-index'));
      cell.innerHTML = board[index];
    });
  }

  return { board, resetBoard, gameDisplay };
}

const getBoard = () => gameBoard().board;
const getReset = () => gameBoard().resetBoard(getBoard());

let scoresArray = [player1.score++, player2.score++];

// Game functions module
function gameFunctions() {

 

  // Animate winning cells
  function animateCells(indexes, color1, color2, duration) {
    indexes.forEach(index => {
      const cell = document.querySelector(`.cell[data-index="${index}"]`);
      if (cell) {
        let isColor1 = true;
        let font = true;
        const intervalId = setInterval(() => {
          cell.style.backgroundColor = isColor1 ? color1 : color2;
          cell.style.fontSize = font ? '5rem' : '3rem';
          isColor1 = !isColor1;
          font = !font;
        }, 500);

        setTimeout(() => {
          clearInterval(intervalId);

          cell.style.backgroundColor = ''; 
        }, duration);
      }
    });
  }

  // Check for winning combinations
  const checkForWins = (board) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const positions of winningCombos) {
      const [a, b, c] = positions;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const theWinIndex = [a, b, c];
       
        // animateCells(theWinIndex, 'rgb(39, 76, 74)', 'lightseagreen', 2000);
  
        return board[a];
      }
    }

    if (board.every(cell => cell !== "")) {
      console.log('tie');
      statusMessage.innerText = 'A TIE';
      return true;
    }
    return false;
  };

 function scoreHandler(win){

  scoreDom(win)
 }

  // Update the DOM with the scores
  function scoreDom(x) {
    if(x === 'X') {
      playerOneNameDom.innerHTML = `${player1.name} (${player1.marker})`;
      playerOneScoreDom.innerHTML = scoresArray[0]++;

      statusMessage.innerHTML = `${player1.marker} is the winner`;
      setTimeout(() => {
      statusMessage.innerHTML = ''; 
    }, 2000);
    } else if('O') {
      playerTwoNameDom.innerHTML = `${player2.name} (${player2.marker})`;
      playerTwoScoreDom.innerHTML = scoresArray[1]++;
      
      statusMessage.innerHTML = `${player2.marker} is the winner`;
     
      setTimeout(() => {
      statusMessage.innerHTML = ''; 
    }, 2000);
      
    }else{
      statusMessage.innerHTML = `A Tie`;
      setTimeout(() => {
      statusMessage.innerHTML = ''; 
    }, 2000);
    }
  }


  return { checkForWins, scoreHandler,  scoreDom, animateCells};
}

// Game play module
function gamePlay() {

  let activePlayer = player1;

  // Switch player turn
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    statusMessage.innerText = 'Start';
    statusMessage.innerText = `${activePlayer.marker} is your Turn`;
  }

  // Get active player
  const getActivePlayer = () => activePlayer;

  
  
  // Insert player marker
  function playerInsertMarker(board) {
    gameBoxDom.addEventListener('click', (e) => {
      const clickedGrid = e.target;
      const index = parseInt(clickedGrid.getAttribute('data-index'));

      if(board[index] !== "") {
        board[index] = board[index];
      } else {
        board[index] = getActivePlayer().marker;
        switchPlayerTurn();
      }

      const gameDisplay = () => gameBoard().gameDisplay(board);
      gameDisplay(board);
      gameOverFunc(board)
      let gameOver = gameFunctions().checkForWins(board);
  

    });
    
  }


  // // Start a round
  function playRound(board) {
    
    DOMgrid.forEach(cell=>{
      cell.innerHTML = ""
      getReset()
    })
  playerInsertMarker(board)

 
 
  }

  function playNewRound(board, gameOverFunc){
    // playRound(board)

    console.log(gameOverFunc)
    if(gameOverFunc === 'X'){
      console.log('Its over')
      DOMgrid.forEach(cell=>{
        cell.innerHTML = ""
        playRound(getBoard())
      })
     
    }else{
      console.log('Its not')
    }
  }
  
 



  return { playRound, playNewRound, playerInsertMarker, getActivePlayer, switchPlayerTurn };
}

// Initialize the game
const game = gamePlay();
game.playRound(getBoard());

// game.playNewRound(getBoard())

const playAgain = document.getElementById('playAgain').addEventListener('click', ()=>{
  game.playRound(getBoard());

})


resetScores.addEventListener('click', () => {
  scoresArray = [0, 0];
});
