// let angle = 0; 

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   background(0);
//   textSize(32);
//   fill(255);
// }

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
var recording=false;

function preload(){
  song=loadFound('tumho1.mp3')
  font=loadFont('jaini.ttf')
}

function setup(){
  creatCanvas(650,650);
  colorMode(RGB,255);
  cols=floor(width/scl);
  rows=floor(height/scl);
  fr=createP('');
  flowfield=new Array(cols*rows);

  for(var i=0;i<8300;i++){
    particles[i]=new Particle();
  }
  background(0);
  song.loop();
  song.setVolume(0.5);

  capturer=new CanvasCaptureMediaStreamTrack({ format:'webm',framrate:30});
  capturer.start();
  recording=true;
}