// canonical hand pose detection script
// I took bits of this from the ML5 website 
// Michael Palumbo

let video;
let handPose;
let hands = [];

let cutoff = 0;
let drawCoords = [];

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  //video.hide();
  handPose.detectStart(video, function (results) {
    hands = results;
  });
}

function draw() {
  
   if (video) {
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();
  }

  for (let hand of hands) {
    for (let kp of hand.keypoints) {
      let mirroredX = width - kp.x;


      if (kp.name == 'index_finger_dip') {
        cutoff = kp.y;
      }

      if (kp.name == 'index_finger_tip') {
        if (kp.y < cutoff) { 
          drawCoords.push([mirroredX, kp.y]); 
        }
        circle(mirroredX, kp.y, 10);
      }
      fill(0);
    }
  }

  for (let point of drawCoords) {
    fill(0, 255, 0);
    noStroke();
    circle(point[0], point[1], 10);
  }
}