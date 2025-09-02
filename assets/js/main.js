const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const box = 20;
let snake, direction, food, game;
let score = 0; // متغیر امتیاز

function initGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = null;
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
  score = 0; // ریست امتیاز در شروع بازی
  if (game) clearInterval(game);
  game = setInterval(draw, 100);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  else if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  else if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  else if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // نمایش مار
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#0f0' : '#0a0';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // نمایش غذا
  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x, food.y, box, box);

  // نمایش امتیاز
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 25);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === 'LEFT') headX -= box;
  if (direction === 'RIGHT') headX += box;
  if (direction === 'UP') headY -= box;
  if (direction === 'DOWN') headY += box;

  // بررسی برخورد با دیوار یا خود مار
  if (
    headX < 0 || headY < 0 ||
    headX >= canvas.width || headY >= canvas.height ||
    snake.some((segment, index) => index !== 0 && segment.x === headX && segment.y === headY)
  ) {
    clearInterval(game);
    setTimeout(() => {
      if (confirm(`Game Over! Your score: ${score}\nRestart?`)) {
        initGame();
      }
    }, 100);
    return;
  }

  let newHead = { x: headX, y: headY };
  snake.unshift(newHead);

  // بررسی خوردن غذا
  if (headX === food.x && headY === food.y) {
    score++; // افزایش امتیاز
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } else {
    snake.pop();
  }
}

initGame();
