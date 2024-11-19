let headTop = 10;
let headLeft = 12;
let direction = "up";

const config = {
  size: 20,
  width: 60,
  height: 40,
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
    if (direction === "up" || direction === "down") {
      direction = newDirection;
    }
  }
}
function goRight() {
  headLeft = headLeft + 1;
  render();
}

setInterval(gameLoop, 300);

function gameLoop() {
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
  }
}
function render() {
  const snakeHtml = `<div class = "snake" style = "width: ${
    1 * config.size
  }px; height: ${1 * config.size}px; top: ${headTop * config.size}px; left: ${
    headLeft * config.size
  }px" ></div>`;
  boardEl.innerHTML = snakeHtml;
}
render();
