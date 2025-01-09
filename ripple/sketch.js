let offset =220;
let dropAlpha=200;

function setup (){
    createCanvas(windowWidth, windowHeight)
    noFill()
    frameRate(40)
    blendMode(ADD); //using chat gpt for blend 
}
function draw(){
    background (0,0,0,20);
    translate(width/2,height/2);

    var maxRadius=324;
    var numRipples = 20;      // edit here for number of ripple strokes
    var angleOffset=frameCount*0.01;

    for (var i=0;i<numRipples;i++){
        var baseRadius=(i/numRipples)*maxRadius;
        var radius= baseRadius+(frameCount*3)//% maxRadius; // continously wwrapping the radius 
        var angle=(i/numRipples)*TWO_PI+angleOffset;

        push();
        rotate(angle);

        let alpha = 225-(radius/maxRadius)*225;
        //used gpt for this 
        if (radius < 0.05) alpha = 0; //avoiding overlapping of alpha and radius
        let red = map(sin(angle + frameCount * 0.02), -1, 1, 100, 255);
        let blue = map(cos(angle + frameCount * 0.03), -1, 1, 50, 200);
        stroke(red, 0, blue, alpha);
        strokeWeight(map(baseRadius, 0, maxRadius, 3, 0.5));
        ellipse(0,0,radius*2,radius*2);

    for (var j=0;j<5;j++){
        var dropAngle=TWO_PI/8*j;
        var x= radius*cos(dropAngle);
        var y=radius*sin(dropAngle);
        var sinval=sin(frameCount*0.02+j);
        let dropSize = ((sinval + 1) / 2) * (radius / 8);
        stroke(90,5,225,dropAlpha*sinval);
        ellipse(x,y,dropSize,dropSize)

    }
    pop();
  }
    
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Resize canvas when window size changes
  }
  