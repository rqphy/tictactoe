const cells = document.querySelectorAll(".cell");
const board = document.querySelector("#board");
const recap = document.querySelector(".recap");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".restart");
const winningCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let oTurn;

restartButton.addEventListener("click", startGame);
startGame();

function startGame() {
  oTurn = false;
  cells.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardClass();
  recap.classList.remove("show");
}

function handleClick(e) {
  cell = e.target;
  const currentTurn = oTurn ? "o" : "x";
  placeMark(cell, currentTurn);
  if (checkWin(currentTurn)) {
    endGame(false);
  } else if (boardIsFull()) {
    console.log(boardIsFull());
    endGame(true);
  } else {
    switchTurn(currentTurn);
  }
  setBoardClass();
}

function switchTurn() {
  oTurn = !oTurn;
}

function checkWin(currentTurn) {
  return winningCases.some((winningcase) => {
    return winningcase.every((index) => {
      return cells[index].classList.contains(currentTurn);
    });
  });
}

function setBoardClass() {
  board.classList.remove("x");
  board.classList.remove("o");
  if (oTurn) {
    board.classList.add("o");
  } else {
    board.classList.add("x");
  }
}

function boardIsFull() {
  return [...cells].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

function placeMark(cell, turn) {
  cell.classList.add(turn);
}

function endGame(draw) {
  if (draw) {
    message.textContent = "Draw !";
  } else {
    message.textContent = `${oTurn ? "Player 2" : "Player 1"}'s win`;
  }
  recap.classList.add("show");
}
