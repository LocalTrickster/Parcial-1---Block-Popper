const WIDTH = 960;
const HEIGHT = 640;
const MAX_BALL_SPEED = 650;

const app = document.getElementById('app');
const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d');
app.appendChild(canvas);

const keys = {
  left: false,
  right: false,
};

const state = {
  paddle: { x: WIDTH / 2 - 50, y: HEIGHT - 24, w: 100, h: 14, speed: 420 },
  balls: [],
  bricks: [],
  powerUps: [],
  score: 0,
  lives: 3,
  level: 1,
  status: 'LISTO',
  gameOver: false,
  ballSpeed: 240,
  respawnPending: false,
  levelTransitionPending: false,
  ballLaunched: false,
  started: false,
  victory: false,
  paddleLongTimer: 0,
  scene: 'playing',
  lastBrickAt: 0,
  speedBonus: 0,
  speedBonusTimer: 0,
};

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function capBallSpeed(ball) {
  const speed = Math.hypot(ball.vx, ball.vy);
  if (speed > MAX_BALL_SPEED) {
    const ratio = MAX_BALL_SPEED / speed;
    ball.vx *= ratio;
    ball.vy *= ratio;
  }
}

function normalizeBallSpeed(ball, speed = state.ballSpeed) {
  const currentSpeed = Math.hypot(ball.vx, ball.vy) || speed;
  const ratio = speed / currentSpeed;
  ball.vx *= ratio;
  ball.vy *= ratio;
}

function getBallSpeedFor(ball) {
  return state.ballSpeed;
}

function resetGame() {
  state.score = 0;
  state.lives = 3;
  state.level = 1;
  state.status = 'LISTO';
  state.gameOver = false;
  state.victory = false;
  state.started = false;
  state.ballSpeed = 240;
  state.powerUps = [];
  state.levelTransitionPending = false;
  state.respawnPending = false;
  state.paddleLongTimer = 0;
  state.paddle.w = 100;
  state.paddle.x = WIDTH / 2 - state.paddle.w / 2;
  state.scene = 'playing';
  state.lastBrickAt = 0;
  state.speedBonus = 0;
  state.speedBonusTimer = 0;
  createBrickField();
  resetBall();
}

function createBall(x = state.paddle.x + state.paddle.w / 2, y = state.paddle.y - 10, options = {}) {
  return {
    x,
    y,
    radius: options.radius ?? 6,
    vx: options.vx ?? 0,
    vy: options.vy ?? 0,
    big: false,
    extraBreaks: 0,
    launched: options.launched ?? false,
    isOriginal: options.isOriginal ?? false,
  };
}

function resetBall() {
  state.balls = [createBall(undefined, undefined, { launched: false, isOriginal: true })];
  state.ballLaunched = false;
}

function launchBall() {
  if (state.gameOver || state.balls.length === 0) return;

  const waitingBall = state.balls.find((ball) => !ball.launched);
  if (!waitingBall) return;

  state.started = true;
  state.ballLaunched = true;
  waitingBall.launched = true;

  const speed = getBallSpeedFor(waitingBall);
  const angle = (Math.random() * 0.9 - 0.45) * Math.PI * 0.9;
  waitingBall.vx = Math.cos(angle) * speed;
  waitingBall.vy = -Math.abs(Math.sin(angle) * speed);
  normalizeBallSpeed(waitingBall, speed);
}

function createBrickField() {
  state.bricks = [];
  state.powerUps = [];
  const rows = 12;
  const cols = 30;
  const brickWidth = 30;
  const brickHeight = 12;
  const padding = 2;
  const totalWidth = cols * brickWidth + (cols - 1) * padding;
  const startX = (WIDTH - totalWidth) / 2;
  const startY = 50;

  for (let row = 0; row < rows; row += 1) {
    const hue = 190 + (row / rows) * 35;
    const color = `hsl(${hue}, 80%, 65%)`;
    for (let col = 0; col < cols; col += 1) {
      const x = startX + col * (brickWidth + padding);
      const y = startY + row * (brickHeight + padding);
      state.bricks.push({
        x,
        y,
        w: brickWidth,
        h: brickHeight,
        alive: true,
        points: 20,
        color,
      });
    }
  }
}

function spawnPowerUp(x, y, type = ['triple', 'multiply', 'long'][Math.floor(Math.random() * 3)]) {
  state.powerUps.push({
    x,
    y,
    w: 16,
    h: 12,
    vy: 180,
    type,
  });
}

function activateLongPaddle() {
  state.paddleLongTimer = 10;
  state.paddle.w = 160;
  state.paddle.x = clamp(state.paddle.x, 0, WIDTH - state.paddle.w);
}

function multiplyBalls() {
  if (state.balls.length >= 55) return;

  const currentBalls = state.balls.filter((ball) => Math.hypot(ball.vx, ball.vy) > 0.01);
  for (const ball of currentBalls) {
    if (state.balls.length >= 55) break;
    const angle = Math.atan2(ball.vy, ball.vx);
    const speed = state.ballSpeed;
    const firstBall = {
      x: ball.x,
      y: ball.y,
      radius: ball.radius,
      vx: Math.cos(angle - 0.22) * speed,
      vy: Math.sin(angle - 0.22) * speed,
      big: ball.big,
      extraBreaks: ball.extraBreaks,
      launched: true,
      isOriginal: false,
    };
    normalizeBallSpeed(firstBall, speed);
    state.balls.push(firstBall);
    if (state.balls.length >= 55) break;
    const secondBall = {
      x: ball.x,
      y: ball.y,
      radius: ball.radius,
      vx: Math.cos(angle + 0.22) * speed,
      vy: Math.sin(angle + 0.22) * speed,
      big: ball.big,
      extraBreaks: ball.extraBreaks,
      launched: true,
      isOriginal: false,
    };
    normalizeBallSpeed(secondBall, speed);
    state.balls.push(secondBall);
  }
}

function addTripleBalls() {
  for (let i = 0; i < 3; i += 1) {
    state.balls.push(createBall(state.paddle.x + state.paddle.w / 2, state.paddle.y - 10, { launched: false, isOriginal: false }));
  }

  state.started = true;
  state.ballLaunched = state.balls.some((ball) => ball.launched);
}

function updatePaddle() {
  if (keys.left) {
    state.paddle.x -= state.paddle.speed * (1 / 60);
  }
  if (keys.right) {
    state.paddle.x += state.paddle.speed * (1 / 60);
  }
  state.paddle.x = clamp(state.paddle.x, 0, WIDTH - state.paddle.w);

  const waitingBalls = state.balls.filter((ball) => !ball.launched);
  if (waitingBalls.length > 0) {
    const centerX = state.paddle.x + state.paddle.w / 2;
    waitingBalls.forEach((ball, index) => {
      const spacing = waitingBalls.length > 1 ? 18 : 0;
      const offset = (index - (waitingBalls.length - 1) / 2) * spacing;
      ball.x = centerX + offset;
      ball.y = state.paddle.y - ball.radius - 2;
    });
  }
}

function updateBalls(dt) {
  for (let i = 0; i < state.balls.length; i += 1) {
    const ball = state.balls[i];
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= WIDTH) {
      ball.vx *= -1;
      ball.x = clamp(ball.x, ball.radius, WIDTH - ball.radius);
    }

    if (ball.y - ball.radius <= 0) {
      ball.vy *= -1;
      ball.y = ball.radius;
    }

    const paddle = state.paddle;
    if (
      ball.y + ball.radius >= paddle.y &&
      ball.y - ball.radius <= paddle.y + paddle.h &&
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.w &&
      ball.vy > 0
    ) {
      const relative = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
      const angle = relative * 1.1;
      const speed = state.ballSpeed;
      ball.vx = Math.sin(angle) * speed;
      ball.vy = -Math.cos(angle) * speed;
      normalizeBallSpeed(ball, speed);
    }

    for (let j = i + 1; j < state.balls.length; j += 1) {
      const other = state.balls[j];
      const dx = other.x - ball.x;
      const dy = other.y - ball.y;
      const distance = Math.hypot(dx, dy);
      const minDist = ball.radius + other.radius;

      if (distance < minDist && distance > 0) {
        const nx = dx / distance;
        const ny = dy / distance;
        const overlap = (minDist - distance) / 2;

        ball.x -= nx * overlap;
        ball.y -= ny * overlap;
        other.x += nx * overlap;
        other.y += ny * overlap;

        const relativeVelocityX = other.vx - ball.vx;
        const relativeVelocityY = other.vy - ball.vy;
        const velocityAlongNormal = relativeVelocityX * nx + relativeVelocityY * ny;

        if (velocityAlongNormal < 0) {
          const impulse = (-(1 + 1) * velocityAlongNormal) / 2;
          const impulseX = impulse * nx;
          const impulseY = impulse * ny;

          ball.vx -= impulseX;
          ball.vy -= impulseY;
          other.vx += impulseX;
          other.vy += impulseY;

          normalizeBallSpeed(ball, state.ballSpeed);
          normalizeBallSpeed(other, state.ballSpeed);
        }
      }
    }

    for (const brick of state.bricks) {
      if (!brick.alive) continue;
      const hit =
        ball.x + ball.radius > brick.x &&
        ball.x - ball.radius < brick.x + brick.w &&
        ball.y + ball.radius > brick.y &&
        ball.y - ball.radius < brick.y + brick.h;

      if (hit) {
        brick.alive = false;
        const now = performance.now();
        const elapsed = state.lastBrickAt ? now - state.lastBrickAt : 1000;
        const bonus = Math.max(0, Math.round(50 - elapsed * 0.04));
        state.speedBonus = bonus;
        state.speedBonusTimer = 1.2;
        state.lastBrickAt = now;
        state.score += brick.points + bonus;

        if (ball.big && ball.extraBreaks > 0) {
          ball.extraBreaks -= 1;
          if (ball.extraBreaks <= 0) {
            ball.big = false;
            ball.radius = Math.max(6, ball.radius - 2);
          }
        }

        if (Math.random() < 0.42) {
          const dropType = ['triple', 'multiply', 'long'][Math.floor(Math.random() * 3)];
          spawnPowerUp(brick.x + brick.w / 2, brick.y + brick.h / 2, dropType);
        }
        const overlapLeft = ball.x + ball.radius - brick.x;
        const overlapRight = brick.x + brick.w - (ball.x - ball.radius);
        const overlapTop = ball.y + ball.radius - brick.y;
        const overlapBottom = brick.y + brick.h - (ball.y - ball.radius);
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        if (minOverlap === overlapLeft || minOverlap === overlapRight) {
          ball.vx *= -1;
        } else {
          ball.vy *= -1;
        }
        normalizeBallSpeed(ball, state.ballSpeed);
        break;
      }
    }

    if (ball.y - ball.radius > HEIGHT) {
      if (ball.isOriginal) {
        state.balls = [];
        break;
      }
      state.balls.splice(i, 1);
      i -= 1;
    }

    capBallSpeed(ball);
  }

  if (state.balls.length === 0 && !state.respawnPending) {
    state.respawnPending = true;
    state.lives -= 1;
    if (state.lives <= 0) {
      state.gameOver = true;
      state.scene = 'gameover';
      state.status = 'FIN DEL JUEGO';
      state.started = false;
      return;
    }
    state.status = 'NUEVA BOLA';
    setTimeout(() => {
      state.respawnPending = false;
      resetBall();
      state.status = 'LISTO';
    }, 700);
  }

  if (state.bricks.every((brick) => !brick.alive) && !state.levelTransitionPending) {
    state.levelTransitionPending = true;
    state.powerUps = [];

    if (state.level >= 1) {
      state.victory = true;
      state.scene = 'victory';
      state.started = false;
      state.status = 'VICTORIA';
      return;
    }

    state.level += 1;
    state.status = `NIVEL ${state.level}`;
    state.ballSpeed += 30;
    setTimeout(() => {
      state.levelTransitionPending = false;
      createBrickField();
      resetBall();
      state.status = 'LISTO';
    }, 700);
  }
}

function updatePowerUps(dt) {
  for (let i = state.powerUps.length - 1; i >= 0; i -= 1) {
    const item = state.powerUps[i];
    item.y += item.vy * dt;

    if (
      item.x + item.w > state.paddle.x &&
      item.x < state.paddle.x + state.paddle.w &&
      item.y + item.h > state.paddle.y &&
      item.y < state.paddle.y + state.paddle.h
    ) {
      if (item.type === 'triple') {
        addTripleBalls();
      } else if (item.type === 'long') {
        activateLongPaddle();
      } else {
        multiplyBalls();
      }
      state.powerUps.splice(i, 1);
      continue;
    }

    if (item.y > HEIGHT + 20) {
      state.powerUps.splice(i, 1);
    }
  }
}

function drawText() {
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 20px Arial';
  ctx.fillText(`PUNTOS: ${state.score}`, 22, 28);
  ctx.fillStyle = '#fbbf24';
  ctx.fillText(`BONO: +${state.speedBonus}`, 22, 54);
  ctx.fillStyle = '#fbbf24';
  ctx.fillText(`VIDAS: ${state.lives}`, 820, 28);
  ctx.fillStyle = '#34d399';
  ctx.fillText(state.status, 430, 28);
}

function drawPaddle() {
  const { x, y, w, h } = state.paddle;
  const nearEnd = state.paddleLongTimer > 0 && state.paddleLongTimer <= 1;
  const shouldBlink = nearEnd && Math.floor(state.paddleLongTimer * 10) % 2 === 0;
  ctx.fillStyle = shouldBlink ? '#fef08a' : '#7dd3fc';
  ctx.fillRect(x, y, w, h);
}

function drawBricks() {
  for (const brick of state.bricks) {
    if (!brick.alive) continue;
    ctx.fillStyle = brick.color;
    ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
  }
}

function drawBalls() {
  for (const ball of state.balls) {
    ctx.fillStyle = ball.isOriginal ? '#ff4d4d' : '#ffffff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPowerUps() {
  for (const item of state.powerUps) {
    ctx.fillStyle = item.type === 'triple' ? '#a78bfa' : item.type === 'long' ? '#22d3ee' : '#fbbf24';
    ctx.fillRect(item.x, item.y, item.w, item.h);
  }
}

function drawTutorial() {
  if (state.started || state.victory || state.gameOver) return;

  ctx.fillStyle = 'rgba(8, 24, 39, 0.7)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'center';
  ctx.font = 'bold 32px Arial';
  ctx.fillText('BLOCK POPPER', WIDTH / 2, 180);

  ctx.font = 'bold 22px Arial';
  ctx.fillText('CONTROLES', WIDTH / 2, 240);
  ctx.font = '20px Arial';
  ctx.fillText('Mover: A / D', WIDTH / 2, 275);
  ctx.fillText('Lanzar bola: ESPACIO', WIDTH / 2, 305);
  ctx.fillText('Recoge x2, Triple o Long para habilidades especiales', WIDTH / 2, 345);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 24px Arial';
  ctx.fillText('PRESIONA ESPACIO PARA EMPEZAR', WIDTH / 2, 430);
  ctx.textAlign = 'left';
}

function drawGameOver() {
  if (state.scene !== 'gameover') return;

  ctx.fillStyle = 'rgba(8, 24, 39, 0.82)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'center';
  ctx.font = 'bold 44px Arial';
  ctx.fillText('GAME OVER', WIDTH / 2, 220);

  ctx.font = 'bold 24px Arial';
  ctx.fillText(`PUNTOS: ${state.score}`, WIDTH / 2, 280);
  ctx.fillText(`VIDAS RESTANTES: ${state.lives}`, WIDTH / 2, 320);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 28px Arial';
  ctx.fillText('PRESIONA ESPACIO PARA REINICIAR', WIDTH / 2, 420);
  ctx.textAlign = 'left';
}

function drawVictory() {
  if (state.scene !== 'victory') return;

  ctx.fillStyle = 'rgba(8, 24, 39, 0.82)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'center';
  ctx.font = 'bold 44px Arial';
  ctx.fillText('VICTORIA', WIDTH / 2, 220);

  ctx.font = 'bold 24px Arial';
  ctx.fillText(`PUNTOS: ${state.score}`, WIDTH / 2, 280);
  ctx.fillText(`NIVEL FINAL: ${state.level}`, WIDTH / 2, 320);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 28px Arial';
  ctx.fillText('PRESIONA ESPACIO PARA REINICIAR', WIDTH / 2, 420);
  ctx.textAlign = 'left';
}

function popAllBlocks() {
  for (const brick of state.bricks) {
    brick.alive = false;
  }

  state.score += state.bricks.reduce((sum, brick) => sum + (brick.alive ? brick.points : 0), 0);
  state.bricks = state.bricks.map((brick) => ({ ...brick, alive: false }));
  state.powerUps = [];
  state.victory = true;
  state.scene = 'victory';
  state.started = false;
  state.status = 'VICTORIA';
}

function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = '#081827';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  drawBricks();
  drawPowerUps();
  drawBalls();
  drawPaddle();
  drawText();
  drawTutorial();
  drawGameOver();
  drawVictory();
}

function loop(ts) {
  const dt = Math.min((ts - (loop.lastTime || ts)) / 1000, 0.033);
  loop.lastTime = ts;

  if (state.speedBonusTimer > 0) {
    state.speedBonusTimer -= dt;
    if (state.speedBonusTimer <= 0) {
      state.speedBonus = 0;
    }
  }

  if (state.scene === 'playing') {
    if (state.paddleLongTimer > 0) {
      state.paddleLongTimer -= dt;
      if (state.paddleLongTimer <= 0) {
        state.paddleLongTimer = 0;
        state.paddle.w = 100;
        state.paddle.x = clamp(state.paddle.x, 0, WIDTH - state.paddle.w);
      }
    }

    updatePaddle();

    if (state.started && !state.gameOver) {
      updateBalls(dt);
      updatePowerUps(dt);
    }
  }

  draw();
  requestAnimationFrame(loop);
}

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (key === 'a') keys.left = true;
  if (key === 'd') keys.right = true;
  if (key === 'ñ') {
    popAllBlocks();
    return;
  }
  if (event.code === 'Space') {
    event.preventDefault();
    if (state.scene === 'victory' || state.scene === 'gameover') {
      resetGame();
      return;
    }
    if (!state.started) {
      state.started = true;
    }
    launchBall();
  }
});

window.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase();
  if (key === 'a') keys.left = false;
  if (key === 'd') keys.right = false;
});

createBrickField();
resetBall();
requestAnimationFrame(loop);
