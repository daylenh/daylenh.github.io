var selectedTool = "None"; // variable to hold the currently selected tool
var initials ='dl'; // your initials
var choice = ''; // starting choice, so it is not empty
var screenbg = [180, 215, 240];
var lastscreenshot=61; // last screenshot never taken

function setup() {
  createCanvas(600, 600);  // canvas size
  background(screenbg);   // use our background screen color
}

function draw() {
  if (keyIsPressed) {
    choice = key; // set choice to the key that was pressed
    clear_print(); // check to see if it is clear screen or save image
  }
  if (mouseIsPressed){
    newkeyChoice(choice);  // if the mouse is pressed call newkeyChoice
  }
}

function newkeyChoice(toolChoice) { //toolchoice is the key that was pressed
  // the key mapping if statements that you can change to do anything you want.
  // just make sure each key option has the a stroke or fill and then what type of 
  // graphic function
 if (toolChoice == '1' ) {  // first tool
  drawFuji(mouseX, mouseY);
  } else if (toolChoice == '2') { // second tool
    drawSakuraTree(mouseX, mouseY);
  } else if (toolChoice == '3') { // third tool
    drawPetals(mouseX, mouseY);
  } else if (toolChoice == '4') {
    drawPagoda(mouseX, mouseY);
  } else if (toolChoice == '5') { // this tool calls a function
    drawTorii(mouseX, mouseY);
  } else if (toolChoice == '6') {
    drawBamboo(mouseX, mouseY);
  } else if (toolChoice == '7') {
    drawLantern(mouseX, mouseY);
  } else if (toolChoice == '8') {
    drawKoi(mouseX, mouseY);
  } else if (toolChoice == '9') {
    drawCloud(mouseX, mouseY);
  } else if (toolChoice == '0') {
    drawBirds(mouseX, mouseY);
 }
}

// 1 - Mount Fuji
function drawFuji(x, y) {
  push();
  translate(x, y);
  noStroke();
  // Mountain
  fill(90, 110, 135);
  beginShape();
  vertex(-85, 65);
  vertex(0, -65);
  vertex(85, 65);
  endShape(CLOSE);
  // Snow cap
  fill(250, 250, 245);
  beginShape();
  vertex(-30, -20);
  vertex(-12, -37);
  vertex(0, -65);
  vertex(15, -38);
  vertex(30, -20);
  vertex(12, -27);
  vertex(0, -17);
  vertex(-12, -28);
  endShape(CLOSE);
  pop();
}

// 2 - Cherry Blossom Tree
function drawSakuraTree(x, y) {
  push();
  translate(x, y);
  // Tree trunk
  stroke(95, 55, 40);
  strokeWeight(13);
  line(0, 60, 0, -15);
  line(0, 10, -35, -25);
  line(0, -5, 35, -35);
  line(-25, -20, -40, -40);
  // Blossoms
  noStroke();
  fill(245, 155, 185);
  for (var i = 0; i < 25; i++) {
    var bx = random(-55, 55);
    var by = random(-65, 5);
    ellipse(bx, by, 22, 19);
  }
  fill(255, 210, 220);
  for (var j = 0; j < 12; j++) {
    ellipse(random(-50, 50), random(-60, 0), 9, 9);
  }
  pop();
}

// 3 - Cherry Blossom Petals
function drawPetals(x, y) {
  push();
  translate(x, y);
  noStroke();
  for (var i = 0; i < 12; i++) {
    fill(245, random(150, 190), random(180, 220), 220);
    ellipse(random(-30, 30), random(-30, 30), 9, 14);
  }
  pop();
}


function drawPagoda(x, y) {
  push();
  translate(x, y);
  noStroke();
  // Main building
  fill(145, 65, 45);
  rect(-30, -5, 60, 75);
  // Windows
  fill(45, 45, 55);
  rect(-17, 10, 12, 25);
  rect(5, 10, 12, 25);
  // Support beam
  noStroke();
  fill(145, 65, 45);
  rect(-5, -29, 10, 35);
  // Lower roof
  fill(55, 55, 65);
  beginShape();
  vertex(-65, 0);
  vertex(-35, -20);
  vertex(35, -20);
  vertex(65, 0);
  vertex(0, -8);
  endShape(CLOSE);
  // Upper roof
  fill(65, 60, 65);
  beginShape();
  vertex(-55, -20);
  vertex(-28, -42);
  vertex(28, -42);
  vertex(55, -20);
  vertex(0, -29);
  endShape(CLOSE);
  // Top decoration
  stroke(70, 55, 40);
  strokeWeight(3);
  line(0, -40, 0, -70);
  pop();
}

// 5 - Torii Gate
function drawTorii(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(170, 45, 40);
  // Main pillars
  rect(-40, -10, 12, 90);
  rect(28, -10, 12, 90);
  // Horizontal beams
  rect(-65, -25, 130, 13);
  rect(-48, -10, 96, 10);
  // Curved top ends
  triangle(-65, -25, -53, -25, -60, -35);
  triangle(65, -25, 53, -25, 60, -35);
  pop();
}

// 6 - Bamboo
function drawBamboo(x, y) {
  push();
  translate(x, y);
  stroke(55, 115, 65);
  strokeWeight(8);
  line(-12, 55, -12, -55);
  line(12, 55, 12, -65);
  line(35, 55, 35, -35);
  // Bamboo sections
  stroke(30, 85, 50);
  strokeWeight(2);
  for (var i = -45; i <= 45; i += 30) {
    line(-18, i, -6, i);
    line(6, i, 18, i);
    line(29, i, 41, i);
  }
  // Leaves
  stroke(65, 135, 65);
  strokeWeight(3);
  line(-12, -25, -45, -45);
  line(-12, -5, -40, 15);
  line(12, -35, 45, -55);
  line(12, 0, 45, -15);
  line(35, 5, 60, -15);
  pop();
}

// 7 - Japanese Stone Lantern
function drawLantern(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(110, 110, 105);
  // Base
  rect(-22, 45, 44, 12);
  rect(-15, 25, 30, 20);
  // Pillar
  rect(-7, -5, 14, 30);
  // Light housing
  fill(125, 120, 110);
  rect(-20, -30, 40, 27);
  fill(255, 205, 105);
  rect(-12, -25, 24, 17);
  // Roof
  fill(95, 95, 90);
  triangle(-32, -30, 32, -30, 0, -50);
  pop();
}

// 8 - Koi Fish
function drawKoi(x, y) {
  push();
  translate(x, y);
  noStroke();
  // Body
  fill(245, 240, 220);
  ellipse(0, 0, 65, 30);
  // Tail
  fill(225, 90, 65);
  triangle(-30, 0, -52, -15, -52, 15);
  // Orange markings
  fill(225, 95, 65);
  ellipse(10, -2, 22, 18);
  ellipse(-12, 3, 15, 10);
  // Eye
  fill(30);
  ellipse(25, -3, 5, 5);
  pop();
}

// 9 - Japanese Clouds
function drawCloud(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(250, 245, 235, 220);
  ellipse(-20, 0, 40, 25);
  ellipse(0, -10, 45, 35);
  ellipse(23, 0, 40, 25);
  rect(-20, -5, 43, 17);
  pop();
}


// 0 - Flying Birds
function drawBirds(x, y) {
  push();
  translate(x, y);
  // Draw three birds at different positions
  for (var i = 0; i < 3; i++) {
    push();
    translate(i * 35, i % 2 == 0 ? 0 : 12);
    // Bird body
    noStroke();
    fill(65, 65, 75);
    ellipse(0, 0, 20, 9);
    // Bird head
    ellipse(9, -3, 10, 10);
    // Beak
    fill(190, 125, 65);
    triangle(13, -4, 21, -2, 13, 0);
    // Eye
    fill(25);
    ellipse(11, -4, 2, 2);
    // Tail
    fill(65, 65, 75);
    triangle(-8, 0, -19, -7, -15, 3);
    // Left wing
    fill(85, 85, 100);
    beginShape();
    vertex(-3, -2);
    bezierVertex(-18, -25, -10, -29, 2, -8);
    bezierVertex(5, -5, 4, -3, -3, -2);
    endShape(CLOSE);
    // Right wing
    beginShape();
    vertex(0, -2);
    bezierVertex(12, -23, 23, -19, 8, -3);
    bezierVertex(5, 0, 3, 0, 0, -2);
    endShape(CLOSE);
    pop();
  }
  pop();
}

function clear_print() {
// this will do one of two things, x clears the screen by resetting the background
// p calls the routine saveme, which saves a copy of the screen
  if (key == 'x' || key == 'X') {
    background(screenbg); // set the screen back to the background color
  } else if (key == 'p' || key == 'P') {
    saveme();  // call saveme which saves an image of the screen
  }
}

function saveme(){
  filename=initials+day() + hour() + minute() +second();
  if (second()!=lastscreenshot) {
    saveCanvas(filename, 'jpg');
    key="";
  }
  lastscreenshot=second();
}

function keyPressed() {
  if ("1234567890".includes(key)) {
    toolChoice = key;
    selectedTool = key;

    window.parent.document.getElementById("selectedTool").textContent = key + " - " + getToolName(key);
  }
  if (key == 'x' || key == 'X') {
    toolChoice = '';
    selectedTool = "None";
    window.parent.document.getElementById("selectedTool").textContent = "None";
    background(screenbg);
  }
}

function getToolName(tool) {
    if (tool == '1') return "Mount Fuji";
    if (tool == '2') return "Sakura Tree";
    if (tool == '3') return "Cherry Blossom Petals";
    if (tool == '4') return "Pagoda";
    if (tool == '5') return "Torii Gate";
    if (tool == '6') return "Bamboo";
    if (tool == '7') return "Stone Lantern";
    if (tool == '8') return "Koi Fish";
    if (tool == '9') return "Clouds";
    if (tool == '0') return "Birds";
}

function mousePressed() {
    if (toolChoice !== '') {
        newkeyChoice(toolChoice);
    }
}