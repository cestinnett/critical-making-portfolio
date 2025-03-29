let font;
let availableSlogans = [];
let balls = [];
let maxBalls = 8;

const FADE_DURATION = 10000;
const BROKEN_DELAY = 5000;
let gameOver = false;

let slogans = [
  { txt: "Boss Babe Energy", category: "work", broken: "Bossed Around Daily" },
  { txt: "You Deserve It All", category: "beauty", broken: "Terms Apply" },
  { txt: "Slay the Day", category: "work", broken: "Sold the Dream" },
  { txt: "Feminist AF", category: "activism", broken: "Feminism: Ad Friendly" },
  { txt: "Empowerment Oil", category: "beauty", broken: "Essentially Useless" },
  { txt: "Confidence Serum", category: "beauty", broken: "Insecurity Tinted" },
  { txt: "Glow Up Guaranteed", category: "beauty", broken: "Time-Limited Shine" },
  { txt: "SheEO Essentials", category: "work", broken: "Corporate Chic Mask" },
  { txt: "Representation Refresh", category: "activism", broken: "Face Only" },
  { txt: "Unapologetic™, but Polished", category: "beauty", broken: "Apologize Softly" },
  { txt: "Glass Ceiling Cleaner", category: "work", broken: "Windex for Wage Gaps" },
  { txt: "Add to Cart: Power", category: "activism", broken: "Subscription Required" },
  { txt: "Limited Edition Equality", category: "activism", broken: "While Supplies Last" },
  { txt: "Mood: Monetized", category: "beauty", broken: "Crisis Branded" },
  { txt: "Lipstick Liberation", category: "beauty", broken: "Shade 404" }
];

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER, CENTER);
  colorMode(HSB, 255);
  noStroke();
  resetSlogans();

  for (let i = 0; i < 3; i++) {
    addWord();
  }
}

function draw() {
  background(245);

  if (!gameOver && availableSlogans.length === 0 && balls.length === 0) {
  gameOver = true;
  showEndMessage(); // ✅ This just *calls* the function
  return;
}
	function showEndMessage() {
  background(245);
  fill(20);
  textSize(56);
  text("Feminism: Sold Out.", width / 2, height / 2 - 30);
  textSize(36);
  text("Click play above to restart.", width / 2, height / 2 + 20);
  noLoop(); // ✅ Stops draw() from looping so the message stays
}
	function resetSlogans() {
  availableSlogans = shuffle([...slogans]);
  balls = [];
  gameOver = false;
  loop(); // ✅ Restarts draw() again
}

  for (let i = balls.length - 1; i >= 0; i--) {
    let ball = balls[i];
    ball.pos.add(ball.vel);

    // Bounce with boundary padding
    let tw = textWidth(ball.txt);
    if (ball.pos.x < tw / 2) {
      ball.pos.x = tw / 2;
      ball.vel.x *= -1;
    }
    if (ball.pos.x > width - tw / 2) {
      ball.pos.x = width - tw / 2;
      ball.vel.x *= -1;
    }
    if (ball.pos.y < ball.size) {
      ball.pos.y = ball.size;
      ball.vel.y *= -1;
    }
    if (ball.pos.y > height - ball.size) {
      ball.pos.y = height - ball.size;
      ball.vel.y *= -1;
    }

    // Lifespan logic
    let life = millis() - ball.created;
    let alpha = map(life, BROKEN_DELAY, FADE_DURATION, 255, 0);
    alpha = constrain(alpha, 0, 255);

    // Broken text swap
    if (life > BROKEN_DELAY && !ball.broken) {
      ball.txt = ball.brokenTxt;
      ball.broken = true;
    }

    // Draw with category hue and custom size
    fill(ball.hue, 80, 200, alpha);
    textSize(ball.size);
    text(ball.txt, ball.pos.x, ball.pos.y);

    // Remove faded words
    if (alpha <= 0) {
      balls.splice(i, 1);
    }
  }

  // Add a new word every ~3 seconds
  if (frameCount % 180 === 0 && balls.length < maxBalls && availableSlogans.length > 0) {
    addWord();
  }
}

function addWord() {
  if (availableSlogans.length > 0) {
    let item = availableSlogans.pop();
    let pos = createVector(random(width), random(height));
    let vel = p5.Vector.random2D().mult(0.6); // gentle speed
    let hue = random(190, 250); // rich color range
    let size = random([36, 48, 60]); // 3 sizes

    balls.push({
      pos,
      vel,
      txt: item.txt,
      brokenTxt: item.broken,
      category: item.category,
      created: millis(),
      broken: false,
      hue: hue,
      size: size
    });
  }
}

function resetSlogans() {
  availableSlogans = shuffle([...slogans]);
  balls = [];
  gameOver = false;
}

function mousePressed() {
  if (!gameOver) {
    addWord();
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    resetSlogans();
  }
}

function showEndMessage() {
  background(245);
  fill(20);
  textSize(56);
  text("Feminism: Sold Out.", width / 2, height / 2 - 30);
  textSize(36);
  text("Press 'R' to start again.", width / 2, height / 2 + 20);
}
