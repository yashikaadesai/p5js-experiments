let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textSize(32);
  fill(255);
}

function draw() {
  background(0, 70); // edit the fade effect on the letters here (20 - more fade,70- less fade)
  let x = width / 2;
  let y = height / 2 + sin(angle) * 70; // control the Wave motion here
  textAlign(CENTER);
  text("यहाँ से बहुत दूर", x, y); 

  angle += 0.05; // --> to increment angle sine wave (edit here)
  
}
