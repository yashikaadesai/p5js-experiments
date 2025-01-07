let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textSize(32);
  fill(255);
}

function draw() {
  background(0, 50); // Fade effect
  let x = width / 2;
  let y = height / 2 + sin(angle) * 100; // Wave motion
  textAlign(CENTER);
  text("यहाँ से बहुत दूर", x, y); // "Far from here" in Hindi

  angle += 0.05; // Increment angle for the sine wave
}
