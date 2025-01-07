let wave = [];
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight); // Fullscreen canvas
  background(0); // Black background
  stroke(138, 43, 226); // Purple stroke color
  strokeWeight(2); // Line thickness
  noFill(); // No fill for shapes
}

function draw() {
  background(0, 50); // Fade effect to leave trails
  translate(0, height / 2); // Shift the wave to the vertical center

  // Calculate the next point on the wave
  let y = sin(angle) * 100; // Sine wave formula
  wave.push(y); // Add the point to the wave array

  // Draw the wave
  beginShape();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]); // Connect points with vertices
  }
  endShape();

  angle += 0.1; // Increment angle for the next point

  // Remove points to keep the wave from growing infinitely
  if (wave.length > width) {
    wave.splice(0, 1);
  }
}

// Resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0); // Clear the canvas with a black background
}
