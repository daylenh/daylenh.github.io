var ballx = 300;
var bally = 300;
var ballSize = 40;
var ballVX = 2;
var ballVY = 1.5;
var score = 0;
var gameState = "START";
var startTime = 0;
var timeLeft = 30;
var bonusX = 150;
var bonusY = 150;
var bonusSize = 25;
var bonusVisible = false;
var bonusEndTime = 0;
var nextBonusTime = 0;
var particles = [];
var stars = [];
var combo = 0;
var lastCatchTime = 0;
var shake = 0;
var flash = 0;

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER);
  textSize(20);
  // Create background stars
  for (var i = 0; i < 70; i++) {
    stars.push({
      x: random(width), y: random(height),
      size: random(1, 4), speed: random(0.3, 1.5)
    });
  }
}

function draw() {
  if (gameState == "START") {
    startScreen();
  }
  if (gameState == "PLAY") {
    playGame();
  }
  if (gameState == "WIN") {
    endScreen(true);
  }
  if (gameState == "GAMEOVER") {
    endScreen(false);
  }
}

// BACKGROUND
function drawBackground() {
  background(15, 10, 40);
  noStroke();
  for (var i = 0; i < stars.length; i++) {
    fill(180, 180, 255, 180);
    ellipse(stars[i].x, stars[i].y, stars[i].size);
    stars[i].y += stars[i].speed;
    if (stars[i].y > height) {
      stars[i].y = 0;
      stars[i].x = random(width);
    }
  }
}

// START SCREEN
function startScreen() {
  drawBackground();
  fill(255, 210, 50);
  textSize(48);
  text("BALL HUNTER", width/2, 190);
  fill(255, 220, 50, 80);
  ellipse(150, 270, 65);
  ellipse(450, 270, 65);
  fill(255, 220, 50);
  ellipse(150, 270, 35);
  ellipse(450, 270, 35);
  fill(255);
  textSize(19);
  text("Catch the balls to earn points!", width/2, 340);
  textSize(16);
  text("Reach 30 points before time runs out.", width/2, 380);
  text("Catch bonus stars for extra points!", width/2, 410);
  fill(100, 220, 255);
  textSize(22);
  text("CLICK OR PRESS SPACE TO START", width/2, 490);
}

// MAIN GAME
function playGame() {
  var level = 1;
  if (score >= 10) {
    level = 2;
  }
  if (score >= 20) {
    level = 3;
  }
  drawBackground();
  // Timer
  timeLeft = 30 - floor((millis() - startTime) / 1000);
  if (timeLeft <= 0) {
    timeLeft = 0;
    gameState = "GAMEOVER";
    return;
  }
  // Screen shake
  push();
  if (shake > 0) {
    translate(random(-shake, shake), random(-shake, shake));
    shake *= 0.85;
  }
  // Ball
  updateBall(level);
  drawBall(level);
  // Bonus star
  updateBonus();
  drawBonus();
  // Mouse targeting circle
  noFill();
  stroke(100, 220, 255, 180);
  strokeWeight(2);
  ellipse(mouseX, mouseY, 35 + sin(frameCount * 0.1) * 5);
  noStroke();
  // Catch ball
  var distanceToBall = dist(ballx, bally, mouseX, mouseY);
  if (distanceToBall < ballSize/2 + 10) {
    score++;
    if (millis() - lastCatchTime < 2000) {
      combo++;
    } else {
      combo = 1;
    }
    lastCatchTime = millis();
    createParticles(ballx, bally, 20);
    resetBall();
    shake = 7;
    flash = 15;
    if (score >= 30) {
      gameState = "WIN";
    }
  }
  // Catch bonus star
  if (bonusVisible) {
    var distanceToBonus = dist(bonusX, bonusY, mouseX, mouseY);
    if (distanceToBonus < bonusSize + 10) {
      score += 3;
      bonusVisible = false;
      createParticles(bonusX, bonusY, 30);
      shake = 10;
      nextBonusTime = millis() + 3000;
      if (score >= 30) {
        gameState = "WIN";
      }
    }
  }
  // Particles
  updateParticles();
  pop();
  // Flash effect
  if (flash > 0) {
    fill(255, 255, 255, flash * 3);
    rect(0, 0, width, height);
    flash--;
  }
  drawHUD(level);
}

// MOVE THE BALL
function updateBall(level) {
  var speed = 2 + (level - 1) * 1.5;
  var direction = sqrt(ballVX * ballVX + ballVY * ballVY);
  ballx += ballVX / direction * speed;
  bally += ballVY / direction * speed;
  if (ballx < ballSize/2 || ballx > width - ballSize/2) {
    ballVX *= -1;
  }
  if (bally < ballSize/2 || bally > height - ballSize/2) {
    ballVY *= -1;
  }
}

// DRAW THE BALL
function drawBall(level) {
  ballSize = 40 - (level - 1) * 8;
  var colorChange = sin(frameCount * 0.08) * 30;
  noStroke();
  fill(255, 180 + colorChange, 40, 35);
  ellipse(ballx, bally, ballSize + 35);
  fill(255, 200, 50, 80);
  ellipse(ballx, bally, ballSize + 15);
  fill(255, 220 + colorChange, 60);
  ellipse(ballx, bally, ballSize);
  fill(255);
  ellipse(ballx - 7, bally - 7, 9);
}

// RESET BALL
function resetBall() {
  ballx = random(50, width - 50);
  bally = random(100, height - 80);
  ballVX = random(-3, 3);
  ballVY = random(-3, 3);
  if (abs(ballVX) < 1) {
    ballVX = 2;
  }
  if (abs(ballVY) < 1) {
    ballVY = 2;
  }
}

// BONUS STAR
function updateBonus() {
  if (!bonusVisible && millis() > nextBonusTime) {
    bonusX = random(40, width - 40);
    bonusY = random(100, height - 60);
    bonusVisible = true;
    bonusEndTime = millis() + 5000;
  }
  if (bonusVisible && millis() > bonusEndTime) {
    bonusVisible = false;
    nextBonusTime = millis() + 5000;
  }
}

function drawBonus() {
  if (bonusVisible) {
    var pulse = sin(frameCount * 0.15) * 8;
    noStroke();
    fill(255, 80, 120, 50);
    ellipse(bonusX, bonusY, 65 + pulse);
    fill(255, 100, 140);
    star(bonusX, bonusY, 12, 25 + pulse/2);
  }
}

// DRAW STAR
function star(x, y, innerRadius, outerRadius) {
  beginShape();
  for (var i = 0; i < 10; i++) {
    var angle = TWO_PI * i / 10 - HALF_PI;
    var radius = outerRadius;
    if (i % 2 == 1) {
      radius = innerRadius;
    }
    vertex(
      x + cos(angle) * radius,
      y + sin(angle) * radius
    );
  }
  endShape(CLOSE);
}

// PARTICLE EFFECT
function createParticles(x, y, amount) {
  for (var i = 0; i < amount; i++) {
    particles.push({
      x: x,
      y: y,
      vx: random(-4, 4),
      vy: random(-4, 4),
      size: random(3, 8),
      life: 255
    });
  }
}

function updateParticles() {
  noStroke();
  for (var i = particles.length - 1; i >= 0; i--) {
    var p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 5;
    fill(255, 210, 70, p.life);
    ellipse(p.x, p.y, p.size);
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

// SCORE AND LEVEL DISPLAY
function drawHUD(level) {
  fill(255);
  noStroke();
  textSize(19);
  text("SCORE: " + score, 90, 35);
  text("LEVEL: " + level, width/2, 35);
  fill(255, 100, 130);
  text("TIME: " + timeLeft, width - 90, 35);
  // Progress bar
  fill(70, 60, 100);
  rect(150, 55, 300, 8, 5);
  var progress = score % 10;
  if (score >= 30) {
    progress = 10;
  }
  fill(100, 220, 255);
  rect(150, 55, 300 * progress / 10, 8, 5);
  // Combo display
  if (combo >= 2 && millis() - lastCatchTime < 2000) {
    fill(255, 220, 50);
    textSize(17);
    text(combo + "X COMBO!", width/2, 100);
  }
  fill(255);
  textSize(13);
  text("Catch the red star for +3 points", width/2, height - 20);
}

// WIN AND GAME OVER
function endScreen(won) {
  drawBackground();
  if (won) {
    fill(255, 220, 50);
    textSize(48);
    text("YOU WIN!", width/2, 220);
    fill(255, 220, 50);
    for (var i = 0; i < 10; i++) {
      ellipse(
        random(50, 550),
        random(300, 500),
        random(5, 12)
      );
    }
  } else {
    fill(255, 100, 130);
    textSize(43);
    text("GAME OVER", width/2, 220);
  }
  fill(255);
  textSize(25);
  text("FINAL SCORE: " + score, width/2, 300);
  textSize(18);
  textSize(20);
  text("TIME LEFT: " + timeLeft + " seconds", width/2, 340);
  text("Click or press R to play again", width/2, 390);
}

// START AND RESTART
function mousePressed() {
  if (gameState == "START" ||
      gameState == "WIN" ||
      gameState == "GAMEOVER") {
    beginGame();
  }
}

function keyPressed() {
  if (key == ' ' && gameState == "START") {
    beginGame();
  }
  if (key == 'r' || key == 'R') {
    beginGame();
  }
}

// RESET GAME
function beginGame() {
  score = 0;
  ballx = 300;
  bally = 300;
  ballVX = 2;
  ballVY = 1.5;
  ballSize = 40;
  startTime = millis();
  bonusVisible = false;
  nextBonusTime = millis() + 3000;
  combo = 0;
  lastCatchTime = 0;
  shake = 0;
  flash = 0;
  particles = [];
  gameState = "PLAY";
}
