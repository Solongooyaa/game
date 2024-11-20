let headTop = 5;
let headLeft = 4;
let direction = "right";
let tails = [
  { x: 2, y: 5 },
  { x: 3, y: 5 },
];
let intervalId = null;

const config = {
  size: 20,
  width: 30,
  height: 20,
};

const boardEl = document.getElementById("board");
boardEl.style.width = config.width * config.size + "px";
boardEl.style.height = config.height * config.size + "px";

function goUp() {
  headTop = headTop - 1;
  if (headTop < 0) {
    headTop = config.height - 1;
  }
  render();
}

function goDown() {
  headTop = headTop + 1;
  if (headTop === config.height) {
    headTop = 0;
  }
  render();
}

function changeDirection(newDirection) {
  if (direction === "up" || direction === "down") {
    if (newDirection === "right" || newDirection === "left") {
      direction = newDirection;
    }
  } else if (direction === "right" || direction === "left") {
    if (newDirection === "up" || newDirection === "down") {
      direction = newDirection;
    }
  }
}
function goRight() {
  headLeft = headLeft + 1;
  if (headLeft === config.width) {
    headLeft = 0;
  }
  render();
}
function goLeft() {
  headLeft = headLeft - 1;
  if (headLeft < 0) {
    headLeft = config.width - 1;
  }
  render();
}
function startGame() {
  if (!intervalId) {
    intervalId = setInterval(gameLoop, 300);
  }
}
function pauseGame() {
  clearInterval(intervalId);
  intervalId = null;
}

function restartGame() {
  headTop = 5;
  headLeft = 4;
  direction = "right";
  tails = [
    { x: 2, y: 1 },
    { x: 3, y: 1 },
  ];
  startGame();
}
function gameLoop() {
  tails.push({ x: headLeft, y: headTop });
  tails.shift();
  switch (direction) {
    case "up":
      goUp();
      break;
    case "right":
      goRight();
      break;
    case "down":
      goDown();
      break;
    case "left":
      goLeft();
      break;
  }
}
function listenKey(event) {
  const key = event.key;
  switch (key) {
    case "ArrowUp":
      changeDirection("up");
      break;
    case "ArrowDown":
      changeDirection("down");
      break;
    case "ArrowLeft":
      changeDirection("left");
      break;
    case "ArrowRight":
      changeDirection("right");
      break;
  }
}
document.addEventListener("keydown", listenKey);
function listenSpace(event) {
  const space = event.space;
  console.log(space);
  // const space = event.space;
  // switch (space) {
  //   case ""
  // }
  // console.log(space);
}
document.addEventListener("keydown", listenSpace);
function render() {
  let tailsHtml = "";
  for (let i = 0; i < tails.length; i++) {
    tailsHtml += `<div class = "snake" style = "width: ${
      1 * config.size
    }px; height: ${1 * config.size}px; top: ${
      tails[i].y * config.size
    }px; left: ${tails[i].x * config.size}px" ></div>`;
  }
  // const headHtml = `<div class = "snake" style = "width: ${
  //   1 * config.size
  // }px; height: ${1 * config.size}px; top: ${headTop * config.size}px; left: ${
  //   headLeft * config.size
  // }px" ></div>`;
  const snakeHtml = ` ${tailsHtml}`;
  boardEl.innerHTML = snakeHtml;
}
