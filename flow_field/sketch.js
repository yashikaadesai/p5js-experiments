let cols, rows;
let scale = 20;
let inc = 0.1;
let flowfield = [];
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scale);
  rows = floor(height / scale);

  // Initialize flow field
  flowfield = new Array(cols * rows);

  // Create particles
  for (let i = 0; i < 500; i++) {
    particles.push(new Particle());
  }

  background(0);
}

function draw() {
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

  for (let particle of particles) {
    particle.follow(flowfield);
    particle.update();
    particle.edges();
    particle.show();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
  }

  follow(vectors) {
    let x = floor(this.pos.x / scale);
    let y = floor(this.pos.y / scale);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    stroke(138, 43, 226, 50); // Purple with transparency
    strokeWeight(1);
    point(this.pos.x, this.pos.y);
  }
}
