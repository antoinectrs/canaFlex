let img0, img1, img2, img3, img4, img5, img6;
let size = 450;
let offsetW;
let offsetH;

let distX0;
let distY0;

let vid;

let lastTouch = { y1: 0, y2: 0 };

let stateMachine = {
  state: 0,
}
let segmentHeight;


// let s = second();

function preload() {
  // img = loadImage('shape2.png');
  img0 = loadImage('../moving/intro.png');

  img1 = loadImage('../moving/01.png');
  img2 = loadImage('../moving/02.png');
  img3 = loadImage('../moving/03.png');
  img4 = loadImage('../moving/04.png');

  img5 = loadImage('../moving/01-down.png');
  img6 = loadImage('../moving/01-up.png');

  img7 = loadImage('../moving/keys.png');

  img8 = loadImage('../moving/briquet.png');

}

function setup() {
   createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  offsetW = width / 2;
  offsetH = height / 2;
  segmentHeight = height / 5;
}


function draw() {
  background(255)

  //let offset = map(mouseY, 0, height)
  if (touches.length == 2) {
    let offset = mouseY;

    beginShape();
    changeTexture(touches[0].y,stateMachine.state);
    //haut gauche
    vertex(-offsetW, -offsetH, 0, 0);
    //haut droite
    vertex(offsetW, -offsetH, 1, 0);
    //bas gauche
    if (touches[0].x > width / 2) {
      vertex(offsetW, touches[0].y - offsetH, 1, 1);
      vertex(-offsetW, touches[1].y - offsetH, 0, 1);
    } else {
      vertex(offsetW, touches[1].y - offsetH, 1, 1);
      vertex(-offsetW, touches[0].y - offsetH, 0, 1);
    }
    endShape();
    lastFram(touches[0].y, touches[1].y);
  } else {
    if (stateMachine.state == 0) {
      texture(img0);
      // rectMode(CENTER)
      rect(-offsetW, -offsetH, width,height);
    }
    freezeFrame(lastTouch.y1, lastTouch.y2)
    // freezeFrame(lastTouch.y1)
  }
  // stateLine(stateMachine.state);
}
// this prevents dragging screen around
function touchMoved() {
  return false;
}
function changeTexture(Yposition,state) {
  if(state==0){
    if (Yposition < segmentHeight) {
      // texture(img4);
      if (second() % 2 == 0) {
        texture(img5);
      } else {
        texture(img6);
      }
      stateMachine.state = 1;
    }else{
      texture(img0);
    }
 
  }else if(state==1){
    if (Yposition < segmentHeight) {
      // texture(img4);
      if (second() % 2 == 0) {
        texture(img5);
      } else {
        texture(img6);
      }
    }else if( Yposition > segmentHeight * 4){
      stateMachine.state = 2;
    }else{
      texture(img7);//clef
    }
  }else if(state==2){
    if(Yposition < segmentHeight){
      stateMachine.state = 3;
    }else{
      texture(img4);
      // texture(img7);
    } 
  }if(state==3){
    texture(img8);
  }

   if (Yposition < segmentHeight * 2 && Yposition > segmentHeight) {
   
    
  } else if (Yposition < segmentHeight * 3 && Yposition > segmentHeight * 2) {
    // texture(img2);
    // texture(img7);
  } else {
    // texture(img1);
  }
  textureMode(NORMAL);

}

function lastFram(y1, y2) {
  lastTouch = { y1: y1, y2: y2 }
}
function freezeFrame(y1, y2) {
  beginShape();
  //haut gauche
  vertex(-offsetW, -offsetH, 0, 0);
  //haut droite
  vertex(offsetW, -offsetH, 1, 0);
  //bas gauche
  if (y1 > width / 2) {
    vertex(offsetW, y1 - offsetH, 1, 1);
    vertex(-offsetW, y2 - offsetH, 0, 1);
  } else {
    vertex(offsetW, y2 - offsetH, 1, 1);
    vertex(-offsetW, y1 - offsetH, 0, 1);
  }
  endShape();
}

function stateLine(state) {
  switch (state) {
    case 0:
      drawLine(0, 0)
      break;
    case 1:
      drawLine(segmentHeight * 2, segmentHeight * 2)
      break;
    // case 2:

    //   break;
    // case 3:

    //   break;
    // default:
    //  
  }
}
function drawLine(y1, y2) {
  // push();
  // stroke(0);
  // strokeWeight(10);
  // noFill();

  // line(-offsetW, y1, offsetW, y2);
  // pop();
  fill(0)
  const weight = 10;
  beginShape();
  vertex(-offsetW, y1);
  vertex(offsetW, y2);
  vertex(offsetW, y2 + weight);
  vertex(-offsetW, y1 + weight);
  endShape();
}
