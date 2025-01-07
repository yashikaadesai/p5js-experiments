let currentVisualization = 1; // Variable to track the active visualization
let wave = [];
let angle = 0;
let particles = [];
let cols, rows, scale = 20, inc = 0.1, flowfield = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeFlowField(); // Initialize for flow field
  initializeParticles(); // Initialize for particle system
}

function draw() {
  background(0);

  if (currentVisualization === 1) {
    drawWaveVisualization();
  } else if (currentVisualization === 2) {
    drawParticleSystem();
  } else if (currentVisualization === 3) {
    drawFlowField();
  } else if (currentVisualization === 4) {
    drawReactiveText();
  }
}

function showVisualization(type) {
  currentVisualization = type;
  background(0); // Reset the canvas
}

// 1. Wave Visualization
function drawWaveVisualization() {
  translate(0, height / 2);
  let y = sin(angle) * 100;
  wave.push(y);

  beginShape();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();

  angle += 0.1;

  if (wave.length > width) {
    wave.splice(0, 1);
  }
}

// 2. Particle System
function initializeParticles() {
  particles = [];
}

function drawParticleSystem() {
  particles.push(new Particle(mouseX, mouseY));
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.alpha = 255;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }
  finished() {
    return this.alpha < 0;
  }
  show() {
    noStroke();
    fill(138, 43, 226, this.alpha);
    ellipse(this.x, this.y, 16);
  }
}

// 3. Flow Field
function initializeFlowField() {
  cols = floor(width / scale);
  rows = floor(height / scale);
  flowfield = new Array(cols * rows);
}

function drawFlowField() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

// 4. Reactive Text
function drawReactiveText() {
  let x = width / 2;
  let y = height / 2 + sin(angle) * 100;
  textSize(32);
  fill(255);
  textAlign(CENTER);
  text("यहाँ से बहुत दूर", x, y);

  angle += 0.05;
}
