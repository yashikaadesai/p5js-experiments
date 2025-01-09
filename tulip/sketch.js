function setup() {
    createCanvas(2000, 800);
    noLoop(); // Render once
    colorMode(HSB, 360, 100, 100, 100); // Use HSB for holographic colors
    noFill();
    background(0);
  }
  
  function draw() {
    translate(width / 2, height / 2 + 100);
  
    // Draw tulip petals
    for (let i = 0; i < 6; i++) {
      let angle = i * PI / 3;
      push();
      rotate(angle);
      drawPetal();
      pop();
    }
  // Draw stem
  drawStem();
}

// Function to draw a single petal
function drawPetal() {
  let gradientSteps = 100; // Steps for gradient
  let petalWidth = 150;
  let petalHeight = 300;

  for (let i = 0; i < gradientSteps; i++) {
    let t = i / gradientSteps;
    let hue = map(t, 0, 1, 180, 300); // Iridescent range
    let alpha = map(t, 0, 1, 100, 0); // Fade out
    stroke(hue, 80, 100, alpha);
    strokeWeight(2);

    // Control points for Bezier curves
    bezier(
      0, 0,
      -petalWidth * (1 - t), -petalHeight * t,
      petalWidth * (1 - t), -petalHeight * t,
      0, -petalHeight
    );
  }
}