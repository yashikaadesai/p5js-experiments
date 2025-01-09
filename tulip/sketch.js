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
}