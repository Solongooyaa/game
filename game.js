let headY = 5;
let headX = 5;

let score = 0;

let foodX;
let foodY;
let food;

let direction = "right";
let tails = [
  { x: 2, y: 5 },
  { x: 3, y: 5 },
  { x: 4, y: 5 },
];

let intervalId = null;

const config = {
  size: 20,
  width: 20,
  height: 20,
};

const boardEl = document.getElementById("board");
boardEl.style.width = config.width * config.size + "px";
boardEl.style.height = config.height * config.size + "px";

// food = document.createElement("div");
// food.classList.add("food");
// boardEl.appendChild(food);

function goUp() {
  headY = headY - 1;
  if (headY < 0) {
    headY = config.height - 1;
  }
  render();
}

function goDown() {
  headY = headY + 1;
  if (headY === config.height) {
    headY = 0;
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
  headX = headX + 1;
  if (headX === config.width) {
    headX = 0;
  }
  render();
}
function goLeft() {
  headX = headX - 1;
  if (headX < 0) {
    headX = config.width - 1;
  }
  render();
}
function startGame() {
  generateFood();
  if (!intervalId) {
    intervalId = setInterval(gameLoop, 300);
  }
}

function generateFood() {
  foodX = Math.floor(Math.random() * config.width);
  foodY = Math.floor(Math.random() * config.height);

  // food.style.width = `${20}px`;
  // food.style.height = `${20}px`;
  // food.style.top = `${foodY * config.size}px`;
  // food.style.left = `${foodX * config.size}px`;
}
function pauseGame() {
  clearInterval(intervalId);
  intervalId = null;
}
function reset() {
  headY = 5;
  headX = 5;
  direction = "right";
  tails = [
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
  ];
  generateFood();
}
function restartGame() {
  reset();
  startGame();
}
function gameLoop() {
  tails.push({ x: headX, y: headY });
  tails.shift();

  for (let i = 0; i < tails.length - 1; i++) {
    if (headX === tails[i].x && headY === tails[i].y) {
      alert("Game over");
      restartGame();
    }
  }

  if (headX === foodX && headY === foodY) {
    tails.push({ x: headX, y: headY });
    generateFood();
    score += 1;
  }

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
  let isStarted = false; // Эхлүүлсэн эсэхийг шалгах

  // Space товч дарахад ажиллах үйлдлийг тодорхойлох

  if (event.code === "Space") {
    event.preventDefault(); // Space товчийг хуудас дээр гүйлгэхгүй болгох

    if (!isStarted) {
      start(); // Хэрэв эхлээгүй бол Start хийх
    } else {
      stop(); // Хэрэв эхэлсэн бол Stop хийх
    }
  }

  console.log(event);
}
document.addEventListener("keydown", listenSpace);

function render() {
  let tailsHtml = "";
  const foodHtml = `<div class = "food" style = "width: ${
    1 * config.size
  }px; height: ${1 * config.size}px; top: ${foodY * config.size}px; left: ${
    foodX * config.size
  }px" ></div>`;

  for (let i = 0; i < tails.length; i++) {
    tailsHtml += `<div class = "snake" style = "width: ${
      1 * config.size
    }px; height: ${1 * config.size}px; top: ${
      tails[i].y * config.size
    }px; left: ${tails[i].x * config.size}px" ></div>`;
  }

  boardEl.innerHTML = `${foodHtml} ${tailsHtml} `;
}
