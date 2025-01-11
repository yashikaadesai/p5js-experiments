function setup() {
  createCanvas(600, 800);
  colorMode(HSB, 360, 100, 100, 100); // Use HSB for holographic colors
  noLoop(); // Render once
  noFill();
  background(0); // Black background for holographic look
}

function draw() {
  translate(width / 2, height / 2 + 100); // Center flower

  // Draw tulip petals
  for (let i = 0; i < 6; i++) { // Number of petals
    let angle = PI / 3 * i; // Spread petals evenly
    push();
    rotate(angle);
    drawPetal();
    pop();
  }

  // Draw stem
  drawStem();

  // Draw inner details (e.g., stamens)
  drawStamens();
}

// Function to draw a single petal
function drawPetal() {
  let gradientSteps = 150; // Gradient resolution
  let petalWidth = 120; // Width of the petal
  let petalHeight = 300; // Height of the petal

  for (let i = 0; i < gradientSteps; i++) {
    let t = i / gradientSteps; // Normalized step
    let hue = map(t, 0, 1, 180, 300); // Iridescent gradient (blue to purple)
    let alpha = map(t, 0, 1, 80, 0); // Fade towards the edges
    stroke(hue, 80, 100, alpha); // Holographic colors
    strokeWeight(2);

    // Bezier curve for petal
    bezier(
      0, 0, // Start point
      -petalWidth * (1 - t), -petalHeight * t, // Left control point
      petalWidth * (1 - t), -petalHeight * t, // Right control point
      0, -petalHeight * (1 - t) // Endpoint
    );
  }
}

// Function to draw the stem
function drawStem() {
  stroke(120, 80, 60); // Green stem
  strokeWeight(10);
  line(0, 100, 0, height / 2); // Vertical stem
}

// Function to draw stamens
function drawStamens() {
  let stamenLength = 80;
  let stamenSpread = 50; // Width of stamen spread
  stroke(30, 80, 100); // Yellow stamens
  strokeWeight(3);

  for (let i = -2; i <= 2; i++) {
    let angle = radians(i * 15); // Spread stamens in an arc
    let x = cos(angle) * stamenSpread;
    let y = -sin(angle) * stamenLength;

    line(0, 0, x, y); // Stamen line
    fill(20, 100, 100); // Stamen tips
    ellipse(x, y, 8, 8); // Add a small circle for the stamen tip
    noFill();
  }
}

// Optional: Add subtle noise texture for more realism
function addTexture() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      let noiseVal = noise(x * 0.01, y * 0.01) * 50;
      pixels[index] += noiseVal; // Red channel
      pixels[index + 1] += noiseVal; // Green channel
      pixels[index + 2] += noiseVal; // Blue channel
    }
  }
  updatePixels();
}
