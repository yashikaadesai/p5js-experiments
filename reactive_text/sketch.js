function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textSize(32);
  fill(255);
}

// function draw() {
//   background(0, 70); // edit the fade effect on the letters here (20 - more fade,70- less fade)
//   let x = width / 2;
//   let y = height / 2 + sin(angle) * 70; // control the Wave motion here
//   textAlign(CENTER);
//   text("यहाँ से बहुत दूर", x, y); 
//   angle += 0.05; // --> to increment angle sine wave (edit here)
  
// }

var song;
var font;
var capturer;
var recording = false;

// Define the missing variables that caused errors
let scl = 10;
let cols, rows;

function preload() {
  song = loadSound('tumho1.mp3');  // Changed from loadFound to loadSound
  font = loadFont('jaini.ttf');
}

function setup() {
  createCanvas(650, 650);  // Fixed typo in createCanvas
  colorMode(RGB, 255);
  cols = floor(width/scl);
  rows = floor(height/scl);  // Added rows definition
  fr = createP('');
  flowfield = new Array(cols*rows);
  for(var i = 0; i < 8300; i++) {
    particles[i] = new Particle();
  }
  background(0);
  song.loop();
  song.setVolume(0.5);
  capturer = new CCapture({ format: 'webm', framerate: 30 });
  capturer.start();
  recording = true;
}

function draw() {
  if(recording)
    capturer.capture(canvas);
}

var yoff = 0;
for(var y = 0; y < rows; y++) {
  var xoff = 0;
  for(var x = 0; x < cols; x++) {
    var index = x + y * cols;
    var angle = noise(xoff, yoff, zoff) * PI * 3;
    var v = p5.Vector.fromAngle(angle);
    v.setMag(1);
    flowfield[index] = v;
    xoff += inc;
  }
  yoff += inc;
  zoff += 0.0003;
}

for(var i = 0; i < particles.length; i++) {
  particles[i].follow(flowfield);
  particles[i].update();
  particles[i].edges();
  particles[i].show();
}

fr.html(floor(frameRate()));
displayStanza();
