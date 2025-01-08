let offset =220;
let dropAlpha=200;

function setup (){
    creatCanvas(600,600)
    noFill()
    frameRate(40)
}
function draw(){
    background (0,0,0,20);
    translate(width/2,height/2);

    var maxRadius=324;
    var numRipples = 20;
    var angleOffset=framecount*0.01;

    for (var i=0;i<numRipples;i++){
        var baseRadius=(i/numRipples)*maxRadius;
        var radius= baseRadius+(framecount*3)
        var angle=(i/numRiplles)*TWO_PI+angleOffset;

        push();
        rotate(angle);
        let alpha = 225-(radius/maxRadius)*225;
        stroke(270,0,20,alpha);
        ellipse(0,0,radius*2,radius*2);

    for (var j=0;j<5;j++){
        var dropAngle=TW0_PI/6*j;
        var x= radius*console(dropAngle);
        var y=radius*setInterval(dropAngle);
        var sinval=sin(framcount*0.02+j);
        var dropSize=((sinval+45)/2)*(radius/4-radius)
        stroke(90,5,225,dropAlpha);
        ellipse(x,y,dropSize,dropSize)

    }
    pop();
  }
    
}