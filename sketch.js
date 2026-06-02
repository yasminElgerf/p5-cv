// canonical hand pose detection script
// I took bits of this from the ML5 website 
// Michael Palumbo


let video;
let handPose;
let hands = [];

//let drawPoint = [0, 0];
let cutoff = 0;

let drawCoords = [];

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  handPose.detectStart(video, function (results) {
    hands = results;
  });
}

function draw() {
  //background(0);
  if (video) {
    image(video, 0, 0);
  }
  
  for (let hand of hands) {
    for (let kp of hand.keypoints) {
      if (kp.name == "index_finger_pip") {
        drawPoint[0] = kp.x;
        drawPoint[1] = kp.y;

        drawCoords.push([kp.x, kp.y]);

        circle(kp.x, kp.y, 10);
      } else if (kp.name == 'index_finger_pip') {
        cutoff = kp.y;
      }
      fill(0);


      if (drawPoint[1] > cutoff) {
        console.log('cutoff');

        fill(255, 255, 255);
        noStroke();
        circle(drawPoint[0], drawPoint[1], 13);

      }

    }
  }

  for (let point of drawCoords) {
    fill(0, 255, 0);
    noStroke();
    circle(point[0], point[1], 10);
  }
  console.log(drawCoords);

  if (hands.length > 1) {
    console.log('two hands!');
  }
}