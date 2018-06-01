var hintImage, skyImage, stars = [];
function setup() {
  // put setup code here
 	createCanvas(800,500);
	noCursor();
	noStroke();
	hintImage = loadImage("hint.png");
	skyImage = loadImage("background.jpg");
}

function draw() {
  // put drawing code here
  image(skyImage, 0, 0);
  var position = createVector(mouseX, mouseY);
  fill(255, 192, 0);
  ellipse(position.x, position.y, 8, 8);

  if (mouseIsPressed) {
    var target = findPixel();
    var star = new Star(position, target);
    stars.push(star);
      if (stars.length > 2000) stars.shift();
  }

  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].draw();
  }
}

function findPixel() {
  var x, y;
  for (var i = 0; i < 15; i++) {
    x = floor(random(hintImage.width));
    y = floor(random(hintImage.height));
    if (red(hintImage.get(x,y)) < 255) break;
  }
  return createVector(x,y);
}

function Star(position, target) {
  this.position = position;
  this.target = target;
  this.diameter = random(1, 5);
}

Star.prototype.update = function() {
  this.position = p5.Vector.lerp(
    this.position,
    this.target,
    0.1
  );
};

Star.prototype.draw = function() {
  var alpha = noise(
    this.target.x,
    this.target.y,
    millis()/1000.0
  );
  fill(255, alpha * 255);
    ellipse(
      this.position.x, this.position.y,
      this.diameter, this.diameter
    );
};