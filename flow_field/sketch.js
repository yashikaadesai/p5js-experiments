let cols, rows;
let scale = 20;
let inc = 0.1; 
let zoff = 0; // Third dimension for motion
let flowfield = [];
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scale);
  rows = floor(height / scale);

  flowfield = new Array(cols * rows);

  for (let i = 0; i < 200; i++) {
    particles.push(new Particle());
  }

  background(0); // change background if needed
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4; // Using zoff for motion
      let v = p5.Vector.fromAngle(angle);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
  }
  zoff += 0.001; // Slowly increment zoff for smooth motion

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
    this.maxSpeed = 2.5;   // try changing the speed of the motion here 
    this.prevPos = this.pos.copy();
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
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.prevPos.x = this.pos.x;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.prevPos.x = this.pos.x;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.prevPos.y = this.pos.y;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.prevPos.y = this.pos.y;
    }
  }

  show() {
    stroke(138, 43, 226, 50); // Purple with transparency
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y); // Draw lines
    this.prevPos = this.pos.copy(); // Update the previous position
  }
}
