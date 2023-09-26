const clickSound = new Audio("click.mp3");
const winSound = new Audio("win.mp3");
const resetButton = document.getElementById("reset");
const crossLine = document.querySelector(".line");
let turn = "X";
let gameOver = false;
// Matching the turn on click event listener
const matchTurn = () => {
  return turn === "X" ? "0" : "X";
};

// Check win function here
const checkWin = () => {
  let boxes = document.getElementsByClassName("boxText");
  let wins = [
    [0, 1, 2, 0, 5, 0],
    [3, 4, 5, 0, 15, 0],
    [6, 7, 8, 0, 25, 0],
    [0, 3, 6, -10, 15, 90],
    [1, 4, 7, 0, 15, 90],
    [2, 5, 8, 10, 50, 90],
    [0, 4, 8, 0, 15, 45],
    [2, 4, 6, 0, 15, 135],
  ];

  wins.forEach((element) => {
    if (
      boxes[element[0]].innerHTML === boxes[element[1]].innerHTML &&
      boxes[element[2]].innerHTML === boxes[element[1]].innerHTML &&
      boxes[element[0]].innerHTML !== ""
    ) {
      winSound.play();
      document.getElementsByClassName("turn")[0].innerText = `Win ${
        boxes[element[0]].innerHTML
      }`;
      gameOver = true;
      crossLine.style.transform = ` translate(${element[3]}vw, ${element[4]}vw) rotate(${element[5]}deg)`;
      crossLine.style.opacity = "1";
    }
  });
};

// Game logic here
const boxes = document.querySelectorAll(".box");

Array.from(boxes).forEach((box) => {
  let boxText = box.querySelector(".boxText");
  box.addEventListener("click", () => {
    if (boxText.innerText === "") {
      boxText.innerText = turn;
      turn = matchTurn();
      clickSound.play();
      checkWin();
      if (!gameOver) {
        document.getElementsByClassName(
          "turn"
        )[0].innerText = `Turn For ${turn}`;
      }
    }
  });
});

// working on reset button- for if click button reset all
resetButton.addEventListener("click", () => {
  window.location.reload();
});
