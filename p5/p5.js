
function setup() {
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  // Sky
  background(155, 170, 180);

  // Sunset
  noStroke();
  fill(230, 175, 145);
  rect(0, 280, 600, 100);

  // Distant hills
  fill(75, 68, 72);
  beginShape();
  vertex(0, 310);
  vertex(100, 285);
  vertex(180, 305);
  vertex(300, 280);
  vertex(420, 300);
  vertex(520, 285);
  vertex(600, 305);
  vertex(600, 360);
  vertex(0, 360);
  endShape(CLOSE);

  // Ocean
  fill(100, 140, 155);
  rect(0, 340, 600, 18);

  // Beach
  fill(180, 140, 110);
  rect(0, 358, 600, 242);

  // Back hair
  fill(35, 29, 30);
  beginShape();
  vertex(238, 215);
  bezierVertex(220, 175, 225, 125, 265, 112);
  bezierVertex(285, 95, 315, 95, 340, 112);
  bezierVertex(380, 125, 380, 175, 362, 215);
  bezierVertex(365, 245, 345, 260, 325, 255);
  bezierVertex(310, 265, 290, 265, 275, 255);
  bezierVertex(255, 260, 235, 245, 238, 215);
  endShape(CLOSE);

  // Neck
  noStroke();
  fill(230, 170, 135);
  rect(280, 270, 40, 55);

  // Face
  fill(240, 185, 145);
  ellipse(300, 215, 125, 155);

  // Left side hair (sideburns)
  fill(35, 29, 30);
  beginShape();
  vertex(240, 155);
  bezierVertex(230, 180, 235, 200, 245, 215);
  bezierVertex(250, 220, 255, 215, 257, 205);
  bezierVertex(250, 190, 250, 170, 265, 155);
  endShape(CLOSE);

  // Right side hair (sideburns)
  beginShape();
  vertex(360, 155);
  bezierVertex(370, 180, 365, 200, 355, 215);
  bezierVertex(350, 220, 345, 215, 343, 205);
  bezierVertex(350, 190, 350, 170, 335, 155);
  endShape(CLOSE);

  // Left middle parted hair
  fill(35, 29, 30);
  beginShape();
  vertex(300, 112);
  bezierVertex(275, 95, 245, 110, 235, 145);
  bezierVertex(225, 175, 245, 195, 265, 200);
  bezierVertex(258, 180, 265, 155, 285, 145);
  bezierVertex(290, 135, 295, 122, 300, 112);
  endShape(CLOSE);

  // Right middle parted hair
  beginShape();
  vertex(300, 112);
  bezierVertex(325, 95, 355, 110, 365, 145);
  bezierVertex(375, 175, 355, 195, 335, 200);
  bezierVertex(342, 180, 335, 155, 315, 145);
  bezierVertex(310, 135, 305, 122, 300, 112);
  endShape(CLOSE);

  // Left hair layers
  bezier(270, 115, 240, 125, 235, 155, 255, 180);
  bezier(285, 120, 260, 135, 255, 160, 265, 185);

  // Right hair layers
  bezier(330, 115, 360, 125, 365, 155, 345, 180);
  bezier(315, 120, 340, 135, 345, 160, 335, 185);

  // Middle part detail
  stroke(85, 65, 55);
  strokeWeight(2);
  line(300, 112, 300, 135);

  // Ears
  noStroke();
  fill(240, 185, 145);
  ellipse(237, 220, 20, 30);
  ellipse(363, 220, 20, 30);

  // Eyebrows
  stroke(55, 35, 30);
  strokeWeight(5);
  line(255, 195, 280, 192);
  line(320, 192, 345, 195);

  // Eyes
  noStroke();
  fill(255);
  ellipse(270, 207, 25, 14);
  ellipse(330, 207, 25, 14);

  fill(45, 35, 30);
  ellipse(272, 207, 10, 12);
  ellipse(328, 207, 10, 12);

  // Nose
  stroke(190, 120, 100);
  strokeWeight(2);
  line(300, 215, 295, 235);
  line(295, 235, 305, 237);

  // Smile
  noFill();
  stroke(145, 65, 65);
  strokeWeight(3);
  arc(300, 240, 45, 25, 0, PI);

  // Sweatshirt 
  noStroke();
  fill(45, 43, 58);
  beginShape();
  vertex(280, 300);
  vertex(250, 315);
  vertex(200, 340);
  vertex(170, 410);
  vertex(205, 450);
  vertex(230, 420);
  vertex(220, 600);
  vertex(380, 600);
  vertex(370, 420);
  vertex(395, 450);
  vertex(430, 410);
  vertex(400, 340);
  vertex(350, 315);
  vertex(320, 300);
  endShape(CLOSE);

  // Sleeves
  fill(55, 52, 68);
  quad(205, 345, 245, 355, 215, 470, 180, 440);
  quad(395, 345, 355, 355, 385, 470, 420, 440);

  // Left hand
  noStroke();
  fill(240, 185, 145);
  ellipse(230, 390, 38, 48);

  // Left peace sign fingers
  stroke(240, 185, 145);
  strokeWeight(13);
  strokeCap(ROUND);
  line(220, 385, 205, 345);
  line(240, 385, 255, 350);

  // Right hand
  noStroke();
  fill(240, 185, 145);
  ellipse(370, 390, 38, 48);

  // Right peace sign fingers
  stroke(240, 185, 145);
  strokeWeight(13);
  strokeCap(ROUND);
  line(380, 385, 395, 345);
  line(360, 385, 345, 350);
}
